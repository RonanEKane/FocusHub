// FocusHub Service Worker v20.4
const CACHE_VERSION = 'focushub-v20.4';
const ASSETS_TO_CACHE = [
    '/',
    '/app.html',
    '/style.css',
    '/index.html',
    '/supabase-config.js',
    '/analytics.js',
    '/keyboard-shortcuts.js',
    '/FocusHub_horiinv.svg',
    '/FocusHub_horinorm.svg',
    '/FocusHub_vertinv.svg',
    '/FocusHub_vertnorm.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('[SW] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_VERSION)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip service worker for navigation requests (allows proper redirects)
    if (event.request.mode === 'navigate') {
        event.respondWith(fetch(event.request));
        return;
    }
    
    // Skip Supabase API calls (always use network)
    if (event.request.url.includes('supabase.co')) {
        return event.respondWith(fetch(event.request));
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the fetched response for future use
                        caches.open(CACHE_VERSION)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
            .catch(() => {
                // If both cache and network fail, return offline page
                console.log('[SW] Offline, returning fallback');
                // Could return a custom offline page here
            })
    );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

console.log('[SW] Service Worker loaded');
