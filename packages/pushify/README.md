
## Routing summary

The current URL schema / site map looks like:

Client side (see `router.js`):
* home
* `/subscribed/<slugname>` - display subscribed message and allow adding subscription
* `/subscribe/<slugname>` - allow subscribing to specific messages

Server side (see `server.js`):
* `/pushmsg/<slugname>` - for sending subscriptions.


## MANIFEST

* `package.js` - describe package dependencies
* `lib/collection.js` - describe model description.

### Client side js files

* `pushify.js` - most push notification files
* `router.js` - describe simple routing
* `packages/pushify/assets` - include most client side assets required to setup push notification
* `packages/pushify/layouts` - jsx react layouts

## Server side js files

* `server.js` - describe the server side handling


