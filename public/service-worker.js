// Kill-switch for the service worker registered by the pre-2026 CRA site.
// Browsers that still run the old cache-first worker fetch this URL on
// navigation; installing it wipes every cache, unregisters, and reloads
// open tabs so visitors land on the live site. Keep serving this file.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
