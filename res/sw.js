const VERSION = "0027"
const precacheResources =
[
    '/',
    '/index.html',
    '/repba.js',
    '/data/HOME.0000.jpg',
];

self.addEventListener('install', (event) =>
{
    event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(precacheResources)));
});

const deleteCache = async key =>
{
    await caches.delete(key)
}

const deleteOldCaches = async () =>
{
   const cacheKeepList = [VERSION];
   const keyList = await caches.keys()
   const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
   await Promise.all(cachesToDelete.map(deleteCache));
}

self.addEventListener('activate', (event) =>
{
    event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", function(e)
{
    e.respondWith(
        caches.match(e.request).then(function(response)
        {
            return response || fetch(e.request)
        })
    )
})

/*
    try
    {
//        if ("serviceWorker" in navigator && url.hostname == "reportbase.com")
//           navigator.serviceWorker.register("sw.js"); 
    }
    catch(error)
    {
    }
*/

