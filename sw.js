// WingCast Service Worker v30 - GitHub Pages compatible
const CACHE_NAME = 'wingcast-v30';
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

  const url = new URL(event.request.url);

  // Never cache external API calls — always fetch fresh and don't intercept
  if (!url.hostname.includes('github.io') && !url.hostname.includes('githubusercontent.com')) {
    return; // Let browser handle API calls natively
  }

  // Always fetch HTML fresh
  if (url.pathname.endsWith('.html') || url.pathname === BASE + '/' || url.pathname === BASE) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(BASE + '/index.html'))
    );
    return;
  }

  // Cache first for local assets (icons, manifest etc)
  event.respondWith(
    caches.match(event.request).then(cached => cached ||
      fetch(event.request).then(resp => {
        if (resp && resp.status === 200 && resp.type !== 'opaque') {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, respClone));
        }
        return resp;
      }).catch(() => null)
    )
  );
});
