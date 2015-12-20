FlowRouter.route("/", {
    action: function() {
        ReactLayout.render(HomeLayout);
    }
});

FlowRouter.route("/subscribed/:slugname", {
    action: function() {
        ReactLayout.render(SubscribedLayout);
    }
});

FlowRouter.route("/subscribe/:slugname/:tel", {
    action: function() {
        subscribePushNotification(
            FlowRouter.getParam('tel'),
            FlowRouter.getParam('slugname')
            );
        ReactLayout.render(SubscribedLayout);
    }
});
