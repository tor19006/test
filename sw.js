const CACHE_NAME = 'EAD',
urlsToCache = [
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then((cache) => { return cache.addAll(urlsToCache).then(() => self.skipWaiting()); })
          .catch((err) => { return 'Fallo el registro del cache' + err })
  );
});

self.addEventListener('activate', (e) => {
  const cacheWitheList = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cachesNames) =>
      cachesNames.map((cacheName) => {
        if(cacheName.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
