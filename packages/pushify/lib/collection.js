/**
 * A collection for logging signins
 */
Signins = new Meteor.Collection("signins");

SigninSchema = new SimpleSchema({

  // initial sign in - the first signin for the IP

  "initial_cookie_id": {
    type: String,
    label: "Unique ID of the host login"
  },

  "initial_ip": {
    type: String,
    label: "User IP",
  },

  "initial_useragent" : {
  	type: String,
  	label: "User's User Agent"
  },

  "created_at" : {
  	type: Date,
  	label: "Created date",
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }  	
  },

  // subscription sign in - the second sign in after the IP

  "subscription_ip" : {
    type: String,
    label: "Subscribed User IP",
    optional : true
  },

  "subscription_useragent" : {
  	type: String,
  	label: "User's User Agent",
    optional : true
  },

  "subscribed_at" : {
  	type: Date,
  	label: "Subscription created date",
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true 
  },

  // The correct telephone number - setting up the information for 

  "slugname" : {
    type: String,
    label: "Name of the subscription used",    
  },

  "tel": {
    type: String,
    label: "The telephone number of the user"
  },

  "subscription_reg_id": {
    type: String,
    label: "Subscription registration ID",
    optional: true 
  },  

});

Signins.attachSchema( SigninSchema );