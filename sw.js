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

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            // จัดการกับข้อผิดพลาด เช่น คืนค่าเป็น fallback response
            return new Response('Failed to fetch the resource.');
        })
    );
});
