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
            //setTimeout(function(){ return caches.match(self.location.origin); }, 3000);
            return caches.match(self.location.origin); 
        }
     })
  })
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


this.addEventListener('message', function(event){
   processMsg(event.data);
});


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



function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => this.processMessage(m));
        })
    })
}

function processMessage(msgObj){

 console.log(msgObj);
    try{
        if(msgObj.type==1){
           console.log(msgObj.message);
        }
    }catch(err)
    {
        console.log(err);
    }
}


function sendNotification(msg){
    var msgObg ={"type":1,"message":msg}
    send_message_to_all_clients(msgObg);
}