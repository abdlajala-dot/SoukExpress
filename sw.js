const CACHE_NAME='soukexpress-v3';
const ASSETS=['./','./index.html','./manifest.json','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(names=>Promise.all(names.map(n=>n!==CACHE_NAME&&caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.hostname.includes('supabase.co'))return;e.respondWith(caches.match(e.request).then(cached=>{const fetchP=fetch(e.request).then(res=>{if(res&&res.status===200){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));}return res;}).catch(()=>cached);return cached||fetchP;}));});
