var CACHE_NAME = 'v3';

var urlsToCache = [
'/',
'/dist/app.bundle.js',
'/dist/vendor.bundle.js',
'/dist/vendor.css'
];



this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
          logger('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


this.addEventListener('fetch', function(event) {

    logger("Fetch init");
  event.respondWith(
   caches.match(event.request).then(function(response) {
          logger("Cache Matched", event.request);

       if (response) {
           logger("Return Response");
          return response;
        }

    var fetchRequest = event.request.clone();

    return fetch(fetchRequest).then(
          function(response) {

              logger("Fetched Response");   
             // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
                logger("Invalid Response");
              return response;
            }
            
            var responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                  logger("Adding to Cache");
                cache.put(event.request, responseToCache);
              });

            return response;
            

          });

    })
  );
});



this.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

    console.log("activate");

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
              console.log("OLD CACHE FOUND", key);
            //return caches.delete(key);
        }
      }));
    })
  );
});




function logger(log) {
    //console.log(log);
}