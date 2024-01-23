importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkFirst()
);

const CACHE_NAME = 'quick-reset-timer-cache-v1';
const urlsToCache = [
  '/',
  '/main.css',
  '/main.js',
  '/index.html',
  '/countdown.mp3',
  '/end.mp3'
  // Add other URLs you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// look at network first
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     // First, try to fetch the resource from the network
//     fetch(event.request).catch(() => {
//       // If the network fetch fails, then try to get it from the cache
//       return caches.match(event.request).then(response => {
//         if (response) {
//           return response;
//         }

//         // Optional: Return a default fallback page for certain requests
//         // if both the network and cache are unavailable.
//         // For example, you might want to return a specific offline page
//         // for HTML requests.
//           return caches.match(event.request);
//       });
//     })
//   );
// });
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached response if found
        if (response) {
          return response;
        }

        // Try fetching from the network as a fallback
        return fetch(event.request).catch(() => {
          // If both cache and network are unavailable,
          // show the offline page
          return caches.match('/index.html');
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = ['my-site-cache-v1'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});