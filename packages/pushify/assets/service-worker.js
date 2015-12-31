/****************
 * Acting and activating the registration
 *****************/

var MSG_API_URL = "https://pushify.meteor.com/getmsg/"
var MSG_TITLE = "Pushify"
var MSG_ICON = 'https://pushify.meteor.com/images/icon-192x192.png';
var MSG_TAG = 'simple-push-demo-notification-tag';

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  event.waitUntil(
    fetch(MSG_API_URL)
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

      })
  );  
});   
