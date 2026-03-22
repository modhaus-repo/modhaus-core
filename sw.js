/*
 * ==================================================================
 * FILE: sw.js (Service Worker) ========= Updated 2026-03-22
 * ==================================================================
 * Purpose: Caches the core UI files to enable PWA installation and 
 * provide basic offline resilience.
 */

const CACHE_NAME = 'modhaus-pwa-v2';
const urlsToCache = [
  './hub.html',
  './worker-timesheet.html',
  './admin-timesheet.html',
  './modhaus-web-app-ui-v2.css',
  './modhaus-logo.png'
];

// INSTALL: Save the core files to the phone's memory
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// FETCH: Try the network first, fall back to the cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
