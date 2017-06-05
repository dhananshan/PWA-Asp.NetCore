var CACHE_NAME = 'v2';

var urlsToCache = [
'/',
'/dist/app.bundle.js',
'/dist/vendor.bundle.js',
'/dist/vendor.css'
];


this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
         console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


this.addEventListener('fetch', function(event) {

    console.log("Fetch init");
  event.respondWith(
   caches.match(event.request).then(function(response) {
       console.log("Cache Matched", event.request);

       if (response) {
           console.log("Return Response");
          return response;
        }

    var fetchRequest = event.request.clone();

    return fetch(fetchRequest).then(
          function(response) {

             console.log("Fetched Response");   
             // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log("Invalid Response");
              return response;
            }
            
            var responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log("Adding to Cache");
                cache.put(event.request, responseToCache);
              });

            return response;
            

          });

    })
  );
});



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
