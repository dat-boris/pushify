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
            "+17783205321",
            "0.41255909763276577"
            );
        ReactLayout.render(SubscribedLayout);
    }
});
