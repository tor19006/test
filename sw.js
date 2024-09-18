const CACHE_NAME = 'EAD',
urlsToCache = [
  'https://script.google.com/macros/s/AKfycbxJ0w8sJXbht8UmPGFUQLJpYbCtOnihpmWbaON_VUhCi0mbUbV0ANcuznfeBiinSjvI/exec',
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
            return new Response('Failed to fetch the resource.');
        })
    );
});
