const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  //cache
  "/First-PWA",
  "/First-PWA/index.html",
  "/First-PWA/style.css",
  "/First-PWA/app.js",
  "/First-PWA/manifest.json",
  "/First-PWA/icons/icon-128.png",
  "/First-PWA/icons/icon-512.png",
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
