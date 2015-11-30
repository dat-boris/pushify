
Picker.route('/push_msg', function(params, req, res, next) {
  //var post = Posts.findOne(params._id);
  sendNotification(
    "test-slug",  // slug
    "hola", // message
    function (err, result) {
        res.end(result);
    }
    )
});

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
            'https://pushify.meteor.com/subscribe/'+ //slugname+
            ' to subscribe to Push notification',
  }, function(err, responseData) {
      if (err) throw err;
  });    
}


sendNotification = function (slugname, msg, callback) {
// curl --header "Authorization: key=AIzaSyA3CWIXH1hN8ZLcxrlDilLdndbnmBtrI8o" --header \
//     "Content-Type: application/json" https://android.googleapis.com/gcm/send -d \
//     "{\"registration_ids\":[\"fivXnZp7ePs:APA91bF73_lo7clpJXoSg3N3N172rS4VK2alXpSI_1SpWHIEChO4Q_qgjekp_Ee6tMruD-_uBQEEG8pTS5Ujbbyh3WgRn8AhWIZcu7zoAKWD6pVBJ1VmW8z2SuRLfjuC43cLKZpG0_Wx\"]}"

  reg_ids = Signins.find({
    slugname: slugname,
  }).map(function (signin) {
    var reg_id = signin.subscription_reg_id;
    if (reg_id) {
      return reg_id.split('/').pop();
    }
  });

  console.log("Posting to: "+reg_ids)

  var header = {
        'Authorization' : 'key='+Meteor.settings.GCMAuthID,
        'Content-Type' : 'application/json'
      };
  console.log("User header: "+header.Authorization);

  HTTP.post(
    "https://android.googleapis.com/gcm/send",
    {
      'headers' : header,
      'content' : JSON.stringify({
          registration_ids : reg_ids
      })
    }, function (err, result) {

      if (err) throw err;
      console.log("Sucessfully pushed message! "+result);
      callback(null, result.content);
    });
}