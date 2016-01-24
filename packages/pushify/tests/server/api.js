describe("Server API", function () {
  var hostname = Meteor.absoluteUrl();
  it("should return true", function () {
    HTTP.get(hostname+"/test_endpoint", function(error, response) {
    	console.log("Got response: "+response.content)
        expect(response.content).toBeTruthy(true);
    });
  });
});