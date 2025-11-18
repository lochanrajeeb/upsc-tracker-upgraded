// Very small service worker: caches app shell files for offline viewing
const CACHE = 'upsc-tracker-shell-v1';
const FILES = ['/', '/index.html', '/src/main.jsx', '/manifest.webmanifest'];
self.addEventListener('install', (e)=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('fetch', (e)=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
