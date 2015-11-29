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
