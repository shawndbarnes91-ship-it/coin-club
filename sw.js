/* Katia's Coin Club — offline shell */
var C = "coinclub-v1";
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
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(r){
        var cp = r.clone(); caches.open(C).then(function(c){ c.put("./index.html", cp); });
        return r;
      }).catch(function(){ return caches.match("./index.html"); })
    );
    return;
  }
  e.respondWith(caches.match(req).then(function(r){ return r || fetch(req); }));
});
