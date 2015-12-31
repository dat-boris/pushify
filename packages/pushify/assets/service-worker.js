/****************
 * Acting and activating the registration
 *****************/

var MSG_API_URL = "https://pushify.meteor.com/getmsg/"
var MSG_TITLE = "Pushify"
var MSG_ICON = 'https://pushify.meteor.com/images/icon-192x192.png';
var MSG_TAG = 'simple-push-demo-notification-tag';


function getFromIndexDB(callback) {

  var DB_NAME = "pushify";
  var DB_TABLE = "subscription";
  var DB_KEY = 1;

  var request = indexedDB.open(DB_NAME, 2);

  request.onerror = function(event){
    console.error("sw.DB: Error opening DB", event);
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    var objectStore = db.createObjectStore(DB_TABLE, { keyPath: "id" });
  };

  request.onsuccess  = function(event){
    console.log("sw.DB: Success opening DB", event);
    var db = event.target.result;

    var request = db.transaction([DB_TABLE],
                            "readwrite").objectStore(DB_TABLE).get(DB_KEY);

    request.onsuccess = function(event){
        console.log("sw.tx: Got record: "+request.result);

        callback(request.result.endpoint);
    };

  };
}


function fetchFromMessageURL(callback) {
  getFromIndexDB(function (endpoint) {
    var url = MSG_API_URL+encodeURIComponent(endpoint);
    console.log("Calling url: ", url);
    callback(url);
  });
}


self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  event.waitUntil(
    fetchFromMessageURL(function (msg_url) {
      fetch(msg_url)
        .then(function(response) {
          if (response.status !== 200) {
            throw new Error("Bad result returned")
          }
          return response.json();
        })
        .then(function(data) {
          // see https://github.com/gauntface/simple-push-demo/blob/master/app/service-worker.js

          // https://developers.google.com/cloud-messaging/chrome/client#receive_messages
          self.registration.showNotification(MSG_TITLE, {  
            body: "Msg: "+JSON.stringify(data)+" Evt: "+event,  
            icon: MSG_ICON,  
            tag: MSG_TAG  
          })  

        });
    })
  );
});   
