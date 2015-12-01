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
            "test-slug"  // slug
            );
        ReactLayout.render(SubscribedLayout);
    }
});
