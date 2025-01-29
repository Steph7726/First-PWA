const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  //cache
  "/First-PWA?v=1",
  "/First-PWA/index.html?v=1",
  "/First-PWA/style.css?v=1",
  "/First-PWA/app.js?v=1",
  "/First-PWA/manifest.json?v=1",
  "/First-PWA/icons/icon-128.png?v=1",
  "/First-PWA/icons/icon-512.png?v=1",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
