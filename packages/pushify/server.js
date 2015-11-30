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
	      }
	    );
    }
});