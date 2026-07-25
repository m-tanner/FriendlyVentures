# Friendly Ventures

The personal site of Michael Tanner, live at [friendlyventures.io](https://friendlyventures.io/).

A single-page resume site built with **React 19 + Vite**, served as pure static files
from **Google App Engine** (standard environment, `nodejs22`). All content is
data-driven from a single JSON file.

## Editing content

Everything on the page comes from [`src/data/resume.json`](src/data/resume.json) —
experience, projects, education, skills, contact details. Edit it, rebuild, redeploy.

The downloadable PDF lives at `public/MichaelTanner_Resume.pdf`. To refresh it, replace
that file (it is copied verbatim into the build).

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm test           # vitest + testing-library
npm run build      # production build into dist/
npm run preview    # serve the production build locally (Vite)
npm run host       # serve dist/ with the zero-dep fallback server (PORT=8080)
```

## Deploying

```bash
npm run build

gcloud config set project friendly-ventures-1
gcloud app deploy --no-promote   # deploy a preview version first
# check the version URL printed by the command above, then:
gcloud app services set-traffic default --splits <VERSION>=1
```

Or `gcloud app deploy` alone to promote immediately.

Notes:

- `app.yaml` serves everything statically via Google Frontend — HTTPS is forced,
  hashed assets under `/assets` are cached for a year, `index.html` is served
  `no-cache` so a redeploy never leaves stale asset hashes behind, and no
  instance runs for normal traffic. The `entrypoint` (`node server.js`) is a
  zero-dependency Node static-file server used only as a fallback; it serves
  `dist/` with the same SPA catch-all behaviour and needs no npm packages.
- `.gcloudignore` uploads only `dist/`, `app.yaml`, `server.js`, and the package
  manifests.
- `"gcp-build": ""` in `package.json` stops App Engine's buildpack from re-running
  the build in the cloud; always run `npm run build` locally before deploying.
