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
    },

    update_subscription : function (tel, slugname, user_agent, subscription_endpoint) {
        //https://android.googleapis.com/gcm/send/fmp6dSw7DNY:APA91bG-JwIvlJey6lwLnjs…_ASLe8LwJJLXEzOKZ_BrwD6hc0SdIp7bs_PtkXc2dEocQY6s8bLcP-5h11K9WEPtCVgprJog1z
        Signins.update(
            {
                slugname: slugname,
                tel : tel,
            },
            {
                $set: {
                    subscription_ip : "123.123.123.1",
                    subscription_useragent : user_agent,
                    subscribed_at : new Date(),
                    subscription_reg_id : subscription_endpoint,
                }
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