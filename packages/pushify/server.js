Meteor.methods({
    submit_tel: function (client_context) {

	    Signins.insert({
	      initial_cookie_id : Math.random().toString(),
	      initial_ip : "123.123.123.123",
	      initial_useragent : client_context.useragent,
	      tel: client_context.tel,
	      slugname : client_context.slugname,
	      }, 
	      function( error, result) { 
	        if ( error ) {
	          console.error ( error ); //info about what went wrong
	          throw error;
	        }

	        sendTwilio(client_context.tel, client_context.slugname);
	      }
	    );
    }
});


function sendTwilio(tel, slugname) {
  twilio = Twilio(Meteor.settings.twilioSID, Meteor.settings.twilioAuth);
  twilio.sendSms({
    to: tel,
    from: Meteor.settings.twilioNumber,
    body: 'Please log in at '+
    		'http://pushify.meteor.com/subscribe/'+slugname+
    		' to subscribe to Push notification',
  }, function(err, responseData) {
  	if (err) throw err;
  });	
}