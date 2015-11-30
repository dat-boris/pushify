FlowRouter.route("/", {
    action: function() {
        ReactLayout.render(HomeLayout);
    }
});

FlowRouter.route("/subscribed", {
    action: function() {
        ReactLayout.render(SubscribedLayout);
    }
});

FlowRouter.route("/subscribe", {
    action: function() {
        subscribePushNotification(
            "+17783205321",  // telnumber
            "0.41255909763276577"  // slug
            );
        ReactLayout.render(SubscribedLayout);
    }
});

Picker.route('/push_msg', function(params, req, res, next) {
  //var post = Posts.findOne(params._id);
  sendNotification(
    "0.41255909763276577",  // slug
    "hola", // message
    function (err, result) {
        res.end(result);
    }
  	)
});
