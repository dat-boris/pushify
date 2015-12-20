SubscribedLayout = React.createClass({
  getInitialState () {
    return {
      'slug_name' : 'test-slug-name'
    };
  },

  render() {
  	return <div id='subscribed'>
    <h1>To push notification:</h1>
    <ol>
      <li>Subscribe to push notification via SMS</li>
      <li>Post to the following URL</li>
    </ol>
    <pre>
    curl -d "Message" http://pushify.io/publish/{this.state.slug_name}
    </pre>

    <form onSubmit={this.submitTel}>
      <input type="tel" name="usrtel" placeholder="Subscribe another phone"/>
    </form>

	</div>;
  }
});

