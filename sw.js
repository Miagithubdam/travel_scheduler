const CACHE_NAME = 'my-pwa-cache-2';

// List of files to cache
const urlsToCache = [
    '/',
    '/index.html',
    'scripts.js',
    'manifest.json',
    'styles.css',
    '/img/icon1.png',
    'img/icon2.png',
    'img/icon3.png',
    'img/icon4.png',
];

// Install event - Cache files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - Serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', function(event) {
    if (!(event.request.url.indexOf('http') === 0)) return;

    event.respondWith(async function() {
        try {
            var res = await fetch(event.request);
            var cache = await caches.open(CACHE_NAME);
            cache.put(event.request.url, res.clone());
            return res;
        } catch (error) {
            return caches.match(event.request);
        }
    }());
});

// Activate event - Clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('my-pwa-cache-') && cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


