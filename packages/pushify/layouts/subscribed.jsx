SubscribedLayout = React.createClass({

  getSlugName() {
    return FlowRouter.getParam('slugname');
  },

  render() {
  	return <div id='subscribed'>
    <h1>To push notification:</h1>
    <ol>
      <li>Subscribe to push notification via SMS</li>
      <li>Post to the following URL</li>
    </ol>
    <pre>
    curl -d "Message" http://pushify.io/pushmsg/{this.getSlugName()}
    </pre>

    <form onSubmit={this.submitTel}>
      <input type="tel" name="usrtel" placeholder="Subscribe another phone"/>
    </form>

	</div>;
  }
});

