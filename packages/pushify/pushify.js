/**
 * Function for setting up subscription
 */
var serviceWorkerUrl = '/packages/sketchytechky_pushify/assets/service-worker.js';

// Once the service worker is registered set the initial state  
subscribePushNotification = function (tel, slugname) {
    // Check that service workers are supported, if so, progressively  
    // enhance and add push messaging support, otherwise continue without it.  
    self.addEventListener('load', function() {
      if ('serviceWorker' in navigator) {  
        navigator.serviceWorker.register(serviceWorkerUrl)  
        .then(function (serviceWorkerRegistration) {
        	initialiseState(tel, slugname, serviceWorkerRegistration);
        });  
      } else {  
        console.warn('Service workers aren\'t supported in this browser.');  
      }  
    });
}

function initialiseState(tel, slugname, serviceWorkerRegistration) {  
    // Are Notifications supported in the service worker?  
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
      console.warn('Notifications aren\'t supported.');  
      return;  
    }

    // Check the current Notification permission.  
    // If its denied, it's a permanent block until the  
    // user changes the permission  
    if (Notification.permission === 'denied') {  
      console.warn('The user has blocked notifications.');  
      return;  
    }

    // Check if push messaging is supported  
    if (!('PushManager' in self)) {  
      console.warn('Push messaging isn\'t supported.');  
      return;  
    }

    // We need the service worker registration to check for a subscription  
    // NOTE: skip swr.ready wrapper
    // navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
    serviceWorkerRegistration.pushManager.getSubscription()  
      .then(function(subscription) {  
        if (!subscription) {  
          // We aren't subscribed to push, so set UI  
          // to allow the user to enable push  
          makeNewSubscription(tel, slugname, serviceWorkerRegistration);
        } else {
          // Keep your server in sync with the latest subscriptionId
          sendSubscriptionToServer(tel, slugname, subscription);
        }

      })  
      .catch(function(err) {  
        console.warn('Error during getSubscription()', err);  
      });  
}

function makeNewSubscription(tel, slugname, serviceWorkerRegistration) {  
    // NOTE: skip swr.ready wrapper
    // navigator.serviceWorker.ready.then(function(serviceWorkerRegistration)
    serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true
    })  
      .then(function(subscription) {  
        // TODO: Send the subscription.endpoint to your server  
        // and save it to send a push message at a later date
        return sendSubscriptionToServer(tel, slugname, subscription);  
      })  
      .catch(function(e) {  
        if (Notification.permission === 'denied') {  
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
          console.warn('Permission for Notifications was denied');  
        } else {  
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);  
        }  
      });  
}

/**
 * Function responsible for storing the endpoint info in the IndexDB
 */
function storeInIndexDB(endpoint) {

  var DB_NAME = "pushify";
  var DB_TABLE = "subscription";
  var DB_KEY = 1;

  var request = indexedDB.open(DB_NAME, 2);

  request.onerror = function(event){
    console.error("DB: Error opening DB", event);
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    var objectStore = db.createObjectStore(DB_TABLE, { keyPath: "id" });
  };

  request.onsuccess  = function(event){
    console.log("DB: Success opening DB", event);
    var db = event.target.result;

    var transaction = db.transaction([DB_TABLE],"readwrite");

    var objectStore = transaction.objectStore(DB_TABLE);

    transaction.oncomplete = function(event) {
        console.log("Tx Success");
    };

    transaction.onerror = function(event) {
        console.error("Tx Error", event);
    };

    objectStore.put({'id': DB_KEY, 
                     //'subscription_id' : subscriptionId,
                     'endpoint' : endpoint
                      });

  };

}

function sendSubscriptionToServer(tel, slugname, subscription) {
  storeInIndexDB(subscription.endpoint);

	Meteor.call(
		'update_subscription', 
		tel, slugname, navigator.userAgent, subscription.endpoint
		)
}

