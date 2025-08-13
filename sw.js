// lottery/sw.js
const CACHE = 'lottery-shell-v1';
const ASSETS = [
  '/lottery/',
  '/lottery/index.html',
  '/lottery/styles.css',
  '/lottery/manifest.json',
  '/lottery/a2hs.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Always go to network for CSV/APIs so data stays fresh
  if (url.pathname.endsWith('.csv') || url.pathname.includes('/apis/')) return;
  // Cache-first for shell
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
