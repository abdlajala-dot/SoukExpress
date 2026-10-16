const CACHE_NAME='soukexpress-v5';
const ASSETS=['./','./index.html','./manifest.json','./app-icon.svg','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','https://cdn.jsdelivr.net/npm/chart.js'];
self.addEventListener('install',(e)=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',(e)=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',(e)=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{const network=fetch(e.request).then(res=>{if(res&&res.status===200&&res.type==='basic'){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));}return res;}).catch(()=>cached);return cached||network;}));});
