HomeLayout = React.createClass({
  getInitialState: function() {
    return {count: 0};
  },

  incCount(event) {
  	event.preventDefault();
  	this.setState({count : this.state.count + 1});
  },

  render() {
  	return <div id='home'>
    <h1>Welcome to Meteor!</h1>

    <button onClick={this.incCount} >Click Me</button>
    <p>You&rsquo;ve pressed the button {this.state.count} times.</p>
	</div>;
  }
});

