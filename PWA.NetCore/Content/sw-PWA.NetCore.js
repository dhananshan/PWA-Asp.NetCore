var CACHE_NAME = 'v6';
var resTrack = new Map();

var urlsToCache = [
'/',
'/dist/app.bundle.js',
'/dist/vendor.bundle.js',
'/dist/vendor.css'
];



this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


this.addEventListener('fetch', function (event) {

    event.respondWith(retrieveFromCache(event));

});


function retrieveFromCache(event) {

    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {

            console.log("res:", response);

            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function (response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();
                    cache.put(event.request, responseToCache);
                    resTrack.set(event.request.url, new Date().getTime());
                    console.log("track", resTrack);
                    return response;
                });
        });
    });
}

this.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
        }
      }));
    })
  );
});
