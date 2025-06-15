// PetAlert Global Service Worker
// Version: 1.0.0

const CACHE_NAME = 'petalert-global-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/announcements.html',
    '/add.html',
    '/contact.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json',
    // External resources
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.4.1/dist/MarkerCluster.css',
    'https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    // Fallback offline page
    '/offline.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    console.log('[ServiceWorker] Fetch', event.request.url);

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://cdn.jsdelivr.net') &&
        !event.request.url.startsWith('https://unpkg.com') &&
        !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('[ServiceWorker] Found in cache', event.request.url);
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response as it can only be consumed once
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
            .catch(() => {
                // If both cache and network fail, show offline page
                if (event.request.destination === 'document') {
                    return caches.match('/offline.html');
                }
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'pet-form-sync') {
        console.log('[ServiceWorker] Background sync: pet-form-sync');
        event.waitUntil(
            // Handle offline form submissions
            syncPetForms()
        );
    }
});

// Handle offline form submissions
async function syncPetForms() {
    try {
        const offlineForms = await getOfflineForms();

        for (const form of offlineForms) {
            try {
                // Submit form data to server
                const response = await fetch('/api/pets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form.data)
                });

                if (response.ok) {
                    // Remove successfully synced form
                    await removeOfflineForm(form.id);

                    // Notify user of successful sync
                    self.registration.showNotification('Pet Alert Synced', {
                        body: 'Your pet report has been successfully submitted!',
                        icon: '/img/icon-192.png',
                        badge: '/img/icon-192.png'
                    });
                }
            } catch (error) {
                console.error('[ServiceWorker] Failed to sync form:', error);
            }
        }
    } catch (error) {
        console.error('[ServiceWorker] Sync error:', error);
    }
}

// IndexedDB helpers for offline form storage
async function getOfflineForms() {
    // Implement IndexedDB operations for retrieving offline forms
    return [];
}

async function removeOfflineForm(id) {
    // Implement IndexedDB operations for removing synced forms
}

// Push notification handling
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'New pet alert in your area!',
        icon: '/img/icon-192.png',
        badge: '/img/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/img/icon-192.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/img/icon-192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('PetAlert Global', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification click received');

    event.notification.close();

    if (event.action === 'explore') {
        // Open the app to the announcements page
        event.waitUntil(
            clients.openWindow('/announcements.html')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        event.notification.close();
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
    console.log('[ServiceWorker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Periodic background sync (experimental)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'pet-alerts-sync') {
        console.log('[ServiceWorker] Periodic sync: pet-alerts-sync');
        event.waitUntil(
            // Sync latest pet alerts
            syncPetAlerts()
        );
    }
});

async function syncPetAlerts() {
    try {
        // Fetch latest pet alerts from server (upgrade point: replace with your backend API)
        const response = await fetch('/api/pets/latest');
        if (response.ok) {
            const alerts = await response.json();

            // Store in cache for offline access
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/api/pets/latest', new Response(JSON.stringify(alerts)));

            console.log('[ServiceWorker] Pet alerts synced');
        } else {
            throw new Error('API not available');
        }
    } catch (error) {
        // Fallback: store demo/mock data
        const demoAlerts = [
            { lat: 52.52, lng: 13.405, type: 'lost', name: 'Max - German Shepherd', city: 'Berlin, DE' },
            { lat: 51.5074, lng: -0.1278, type: 'found', name: 'Luna - Tabby Cat', city: 'London, UK' }
        ];
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/api/pets/latest', new Response(JSON.stringify(demoAlerts)));
        console.warn('[ServiceWorker] Using demo data for pet alerts');
    }
}