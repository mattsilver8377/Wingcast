// WingCast Service Worker v29 - GitHub Pages compatible
const CACHE_NAME = 'wingcast-v29';
const BASE = '/Wingcast';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => 
      cache.addAll([BASE + '/index.html', BASE + '/manifest.json']).catch(() => {})
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  // Always fetch HTML fresh
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('.html') || url.pathname === BASE + '/' || url.pathname === BASE) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(BASE + '/index.html'))
    );
    return;
  }

  // Cache first for assets
  event.respondWith(
    caches.match(event.request).then(cached => cached ||
      fetch(event.request).then(resp => {
        if (resp && resp.status === 200) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, resp.clone()));
        }
        return resp;
      }).catch(() => null)
    )
  );
});
