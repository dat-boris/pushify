
Picker.route('/pushmsg/:slugname/:msg', function(params, req, res, next) {
  //var post = Posts.findOne(params._id);

  var slugname = params.slugname;
  if (!slugname) {
    throw "No slugname specified!";
  }

  var msg = params.msg;

  // TODO: cannot get post content so using get for now.
  //http://stackoverflow.com/questions/32705484/how-do-i-access-http-post-body-form-data-with-meteors-webapp-or-anything-els
  console.log("Setting post content for slug ["+slugname+"]: "+msg)

  var result = Signins.update(
      {slugname: slugname},
      {
          $set: {
             message : msg,
          }
      },
      function (err, cursor) {
        sendNotification(
          slugname,  // slug
          "Adding the messages to be sent", // message
          function (err, result) {
              res.end(result);
          }
          );
      }
  );

  console.log("Found result :"+result);

  if (!result) {
    var err = "No result found with: "+slugname+":"+result+")";
    console.error(err);
    throw err;
  }
});

Picker.route('/getmsg/:endpoint', function(params, req, res, next) {
  var endpoint = decodeURIComponent(params.endpoint);

  console.log("Searching for message: "+endpoint);

  var reg_ids = Signins.find({
    subscription_reg_id : endpoint
  }).map(function (signin) {
    var msg = signin.message;
    console.log("Got message", msg);
    res.end(JSON.stringify({
      'msg' : msg || "(undefined)"
    }));
  });

  if (!reg_ids.length) {
    var err = "No subscription found!"
    console.error(err);
    throw err;
  }


});

/**
 * A function used to replace the alpha numeric characters
 * NOTE: this is a work around as FlowRouter.getParam does not handle URLEscape character properly
 */
function stripNonAlphaNumeric(tel) {
  return tel.replace(/\W/g, '')
}

Meteor.methods({
    submit_tel: function (client_context) {

        Signins.insert({
          initial_cookie_id : Math.random().toString(),
          initial_ip : this.connection.clientAddress,
          initial_useragent : client_context.useragent,
          tel: stripNonAlphaNumeric(client_context.tel),
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
        clean_tel = stripNonAlphaNumeric(tel);
        console.log("Updating subscription with: "+slugname+":"+clean_tel);
        //https://android.googleapis.com/gcm/send/fmp6dSw7DNY:APA91bG-JwIvlJey6lwLnjs…_ASLe8LwJJLXEzOKZ_BrwD6hc0SdIp7bs_PtkXc2dEocQY6s8bLcP-5h11K9WEPtCVgprJog1z
        result = Signins.update(
            {
                slugname: slugname,
                tel : clean_tel,
            },
            {
                $set: {
                    subscription_ip : this.connection.clientAddress,
                    subscription_useragent : user_agent,
                    subscribed_at : new Date(),
                    subscription_reg_id : subscription_endpoint,
                }
            }
        );
        if (!result) {
          var err = "No result found with: "+slugname+":"+clean_tel+"("+result+")";
          console.error(err);
          throw err;
        }
    }
});


function sendTwilio(tel, slugname) {
  console.log("Sending message to: "+tel);
  twilio = Twilio(Meteor.settings.twilioSID, Meteor.settings.twilioAuth);
  twilio.sendSms({
    to: tel,
    from: Meteor.settings.twilioNumber,
    body: 'Please log in at '+
            'https://pushify.meteor.com/subscribe/'+slugname+'/'+encodeURIComponent(tel)+
            ' to subscribe to Push notification',
  }, function(err, responseData) {
      if (err) throw err;
  });    
}


sendNotification = function (slugname, msg, callback) {
// curl --header "Authorization: key=AIzaSyA3CWIXH1hN8ZLcxrlDilLdndbnmBtrI8o" --header \
//     "Content-Type: application/json" https://android.googleapis.com/gcm/send -d \
//     "{\"registration_ids\":[\"fivXnZp7ePs:APA91bF73_lo7clpJXoSg3N3N172rS4VK2alXpSI_1SpWHIEChO4Q_qgjekp_Ee6tMruD-_uBQEEG8pTS5Ujbbyh3WgRn8AhWIZcu7zoAKWD6pVBJ1VmW8z2SuRLfjuC43cLKZpG0_Wx\"]}"

  console.log("Looking for id:"+slugname);
  reg_ids = Signins.find({
    slugname: slugname,
  }).map(function (signin) {
    var reg_id = signin.subscription_reg_id;
    if (reg_id) {
      return reg_id.split('/').pop();
    }
  });

  if (!reg_ids.length) {
    var err = "No subscription found!"
    console.error(err);
    throw err;
  }

  console.log("Posting to: "+reg_ids);

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