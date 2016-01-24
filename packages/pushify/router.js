/**
 * Function for checking if we are using chrome
 */
function checkChrome(context, redirect) {
    if (navigator.userAgent.indexOf('Chrome')===-1) {
        redirect('/getchrome/');
    }
}

FlowRouter.route("/", {
    triggersEnter : [checkChrome],
    action: function() {
        ReactLayout.render(HomeLayout);
    }
});

FlowRouter.route("/getchrome/", {
    action: function() {
        ReactLayout.render(ChromeLayout);
    }
});

FlowRouter.route("/subscribed/:slugname", {
    action: function() {
        checkChrome();
        ReactLayout.render(SubscribedLayout);
    }
});

FlowRouter.route("/subscribe/:slugname/:tel", {
    triggersEnter : [checkChrome],
    action: function() {
        subscribePushNotification(
            FlowRouter.getParam('tel'),
            FlowRouter.getParam('slugname')
            );
        ReactLayout.render(SubscribedLayout);
    }
});
