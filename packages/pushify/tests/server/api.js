describe("Server API", function () {
  var hostname = Meteor.absoluteUrl();
  var testSlugName = "test-slug";
  var testSubscription = "google/random_subscription_id";

  beforeEach(function(done) {
  	console.log("Inserting new signin...");
    Signins.insert({
      initial_cookie_id : Math.random().toString(),
      initial_ip : "1.2.3.4",
      initial_useragent : "Self test useragent",
      tel: "1234567",
      slugname : testSlugName,
      subscription_reg_id : testSubscription
    }, function () {
    	done();
    });
  });

  afterEach(function(done) {
  	console.log("Removing new signin...");
    Signins.remove({
      slugname : testSlugName,
      subscription_reg_id : testSubscription
    }, function () {
    	done();
    });
  });

  it("should allow set test message via Get", function (done) {
  	var content = null;
    // var subscriptions = Signins.find({slugname: testSlugName});

    HTTP.get(hostname+"/pushmsg/"+testSlugName+"/test_message", function(error, response) {
    	console.log("Got response: "+response.content);
    	var responseData = JSON.parse(response.content);
    	// since we are faking the subscription id, this will fail
        expect(responseData.success).toBe(false);

        HTTP.get(
        	hostname+"/getmsg/"+encodeURIComponent(testSubscription), 
        	function (err, response) {
	    		console.log("Got message: "+response.content);
		    	var responseData = JSON.parse(response.content);
	        	expect(responseData.msg).toBe("test_message");
		        done();
	        }
	    );
    });
  });  

  it("should allow set test message via Post", function (done) {
  	var content = null;
    // var subscriptions = Signins.find({slugname: testSlugName});

    HTTP.post(
    	hostname+"/pushmsg/"+testSlugName, 
    	{
    		'data' : {'m':'POST_test_message'}
    	},
    	function(error, response) {
	    	console.log("Got response: "+response.content);
	    	var responseData = JSON.parse(response.content);
	    	// since we are faking the subscription id, this will fail
	        expect(responseData.success).toBe(false);

	        HTTP.get(
	        	hostname+"/getmsg/"+encodeURIComponent(testSubscription), 
	        	function (err, response) {
		    		console.log("Got message: "+response.content);
			    	var responseData = JSON.parse(response.content);
		        	expect(responseData.msg).toBe("POST_test_message");
			        done();
		        }
		    );
	    });
  });    
});