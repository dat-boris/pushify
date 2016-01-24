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
    curl -d "m=[message here]" http://pushify.meteor.com/pushmsg/{this.getSlugName()}/
    </pre>

    <form onSubmit={this.submitTel}>
      <input type="tel" name="usrtel" placeholder="Subscribe another phone"/>
      <input type="submit"/>
    </form>

	</div>;
  }
});

