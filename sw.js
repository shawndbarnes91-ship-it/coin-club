/* Katia's Coin Club — offline shell */
var C = "coinclub-v10";
var ASSETS = ["./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./favicon-32.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(C).then(function(c){ return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){ if(k!==C) return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  // Always try network first for the page and the config so updates land.
  if(req.mode === "navigate" || req.url.indexOf("firebase-config.js") !== -1){
    e.respondWith(
      fetch(req).then(function(r){
        var cp = r.clone();
        caches.open(C).then(function(c){ c.put(req.mode === "navigate" ? "./index.html" : req, cp); });
        return r;
      }).catch(function(){ return caches.match(req.mode === "navigate" ? "./index.html" : req); })
    );
    return;
  }

  // Everything else: cache first, fall back to network.
  e.respondWith(caches.match(req).then(function(r){ return r || fetch(req); }));
});
