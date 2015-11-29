HomeLayout = React.createClass({
  submitTel (event) {
    FlowRouter.go('/subscribed/');
  },

  render() {
  	return <div id='home'>
    <h1>Simply push notification to your device!</h1>

    <h3>Try now</h3>

    <input type="tel" name="usrtel"/>
    <input type="submit" onClick={this.submitTel}/>

	</div>;
  }
});

