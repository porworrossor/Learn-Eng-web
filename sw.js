// ========================================
// LingoPath Service Worker (Offline & PWA Support)
// ========================================

const CACHE_NAME = 'lingopath-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/design-system.css',
  './css/components.css',
  './css/layout.css',
  './css/pages.css',
  './js/app.js',
  './js/config.js',
  './js/router.js',
  './js/store.js',
  './js/components/sidebar.js',
  './js/components/modal.js',
  './js/components/toast.js',
  './js/data/placement-questions.js',
  './js/data/demo-lessons.js',
  './js/data/demo-conversations.js',
  './js/data/vocabulary-bank.js',
  './js/services/auth.js',
  './js/services/assessment.js',
  './js/services/curriculum.js',
  './js/services/speech.js',
  './js/services/ai.js',
  './js/pages/landing.js',
  './js/pages/auth.js',
  './js/pages/placement.js',
  './js/pages/goal-selection.js',
  './js/pages/dashboard.js',
  './js/pages/curriculum.js',
  './js/pages/lesson.js',
  './js/pages/conversation.js',
  './js/pages/vocabulary.js',
  './js/pages/assessments.js',
  './js/pages/progress.js',
  './js/pages/settings.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate or cache-first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch updated in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
