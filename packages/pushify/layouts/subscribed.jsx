SubscribedLayout = React.createClass({

  getSlugName() {
    return FlowRouter.getParam('slugname');
  },

  postMessage (event) {
    event.preventDefault();

    // Find the text field via the React ref
    var slug = FlowRouter.getParam('slugname');
    var text = ReactDOM.findDOMNode(this.refs.m).value.trim();

    Meteor.call("post_message", {
      'm' : text,
      'slug' : slug
    });
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

    <form onSubmit={this.postMessage}>
      <input type="text" ref="m" name="m" placeholder="Test your message here!"/>
      <input type="submit"/>
    </form>

	</div>;
  }
});

