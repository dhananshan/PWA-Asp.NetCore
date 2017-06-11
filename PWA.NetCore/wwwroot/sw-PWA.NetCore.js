var CACHE_NAME = 'v6';
var resTrack = new Map();

var urlsToCache = [
    '/',
    '/Home/Fallback',
'/dist/app.bundle.js',
'/dist/vendor.bundle.js',
'/dist/vendor.css'
];


var ignoreRequests = new RegExp('(' + [
    '/Home/TriggerPush'].join('(\/?)|\\') + ')$')


// Install
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch
this.addEventListener('fetch', function (event) {

    if (ignoreRequests.test(event.request.url)) {
        console.log('ignored: ', event.request.url)
        // request will be networked
        return
    }


    event.respondWith(retrieveFromCache(event));
});


// Catch first strategy
function retrieveFromCache(event) {

    return caches.open(CACHE_NAME).then(function (cache) {

        return cache.match(event.request).then(function (response) {
           if (response) {
                return response;
            }

        if(navigator.onLine){
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function (response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();
                    cache.put(event.request, responseToCache);
                    resTrack.set(event.request.url, new Date().getTime());
                    return response;
            });
        }else{
            sendNotification("You are offline, you will be redirected to home page.");
            fallback = self.location.origin + '/Home/Fallback';
            return caches.match(fallback); 

        }
     })
  })
}


// Activate
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


this.addEventListener('message', function(event){
    processMessage(event.data);
});


// Send to client
function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };
        client.postMessage(msg, [msg_chan.port2]);
    });
}


// Send to all clients
function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => this.processMessage(m));
        })
    })
}


function processMessage(msgObj){

    try{
        if(msgObj.type==1){
           console.log(msgObj.message);
        }
    }catch(err)
    {
        console.log(err);
    }
}

// Send notification to UI
function sendNotification(msg){
    var msgObg ={"type":1,"message":msg}
    send_message_to_all_clients(msgObg);
}




self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
        body: event.data.text()
    };

    event.waitUntil(self.registration.showNotification(title, options));
});