/**
 * Zero-dependency static file server for dist/.
 *
 * This is the App Engine fallback entrypoint only: app.yaml serves every URL
 * statically from Google Frontend, so no instance should run for normal
 * traffic. Kept dependency-free on purpose — nothing to audit, nothing to
 * override, nothing to keep up to date.
 */
import { createServer } from 'node:http';
import { open, stat } from 'node:fs/promises';
import { extname, join, resolve, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

const INDEX = join(ROOT, 'index.html');

/**
 * Resolve a request path to an absolute path inside ROOT.
 * Returns null if the path is malformed or escapes ROOT.
 */
function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null; // malformed percent-encoding
  }
  if (decoded.includes('\0')) return null;
  // Treat the request path as root-relative, then confirm containment.
  const candidate = resolve(ROOT, '.' + (decoded.startsWith('/') ? decoded : '/' + decoded));
  if (candidate !== ROOT && !candidate.startsWith(ROOT + sep)) return null;
  return candidate;
}

async function fileHandle(path) {
  try {
    const info = await stat(path);
    if (!info.isFile()) return null;
    return { path, size: info.size };
  } catch {
    return null;
  }
}

async function send(res, method, file, status = 200, extraHeaders = {}) {
  const type = CONTENT_TYPES[extname(file.path).toLowerCase()] || 'application/octet-stream';
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': String(file.size),
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  if (method === 'HEAD') {
    res.end();
    return;
  }
  const handle = await open(file.path, 'r');
  const stream = handle.createReadStream();
  stream.on('error', () => res.destroy());
  stream.pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Method Not Allowed');
      return;
    }

    const urlPath = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`).pathname;
    const resolved = safePath(urlPath);
    if (resolved === null) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Request');
      return;
    }

    // Directory (or "/") requests map to that directory's index.html.
    const direct =
      (await fileHandle(resolved)) ??
      (urlPath.endsWith('/') ? await fileHandle(join(resolved, 'index.html')) : null);

    if (direct) {
      const hashed = urlPath.startsWith('/assets/');
      const isIndex = direct.path === INDEX;
      await send(res, req.method, direct, 200, {
        'Cache-Control': isIndex
          ? 'no-cache'
          : hashed
            ? 'public, max-age=31536000, immutable'
            : 'public, max-age=3600',
      });
      return;
    }

    // SPA fallback: anything else renders the app shell with 200, matching the
    // `url: .*` catch-all handler in app.yaml.
    const index = await fileHandle(INDEX);
    if (!index) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found — run `npm run build` first.');
      return;
    }
    await send(res, req.method, index, 200, { 'Cache-Control': 'no-cache' });
  } catch {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Serving ${ROOT} on http://${HOST}:${PORT}`);
});
