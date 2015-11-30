/**
 * Function for setting up subscription
 */
var serviceWorkerUrl = '/packages/sketchytechky_pushify/assets/service-worker.js';

// Once the service worker is registered set the initial state  
subscribePushNotification = function (tel, slugname) {
    // Check that service workers are supported, if so, progressively  
    // enhance and add push messaging support, otherwise continue without it.  
    if ('serviceWorker' in navigator) {  
      navigator.serviceWorker.register(serviceWorkerUrl)  
      .then(function () {
      	initialiseState(tel, slugname);
      });  
    } else {  
      console.warn('Service workers aren\'t supported in this browser.');  
    }  
}

function initialiseState(tel, slugname) {  
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
    if (!('PushManager' in window)) {  
      console.warn('Push messaging isn\'t supported.');  
      return;  
    }

    // We need the service worker registration to check for a subscription  
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
      // Do we already have a push message subscription?  
      serviceWorkerRegistration.pushManager.getSubscription()  
        .then(function(subscription) {  
          if (!subscription) {  
            // We aren't subscribed to push, so set UI  
            // to allow the user to enable push  
            makeNewSubscription(tel, slugname);
          }

          // Keep your server in sync with the latest subscriptionId
          sendSubscriptionToServer(tel, slugname, subscription);
        })  
        .catch(function(err) {  
          console.warn('Error during getSubscription()', err);  
        });  
    });  
}

function makeNewSubscription(tel, slugname) {  

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
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
    });  
}

function sendSubscriptionToServer(tel, slugname, subscription) {
	Meteor.call(
		'update_subscription', 
		tel, slugname, navigator.userAgent, subscription.endpoint
		)
}

