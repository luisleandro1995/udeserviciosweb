const CACHE_NAME = 'pacman-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/service-worker.js',
    '/images/pacman.png', // Ensure this path is correct
    '/images/ghost.png',  // Ensure this path is correct
];

// Install Service Worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en cache:', assetsToCache);
                return cache.addAll(assetsToCache);
            })
    );
});

// Fetch cached assets when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Activate Service Worker and remove old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Cache viejo eliminado:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
