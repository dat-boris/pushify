HomeLayout = React.createClass({
  submitTel (event) {

    event.preventDefault();
 
    // Find the text field via the React ref
    var tel = ReactDOM.findDOMNode(this.refs.usrtel).value.trim();

    Signins.insert({
      initial_cookie_id : Math.random().toString(),
      initial_ip : "123.123.123.123",
      initial_useragent : (navigator.userAgent || ""),
      tel: tel,
      slugname : Math.random().toString(),
      }, 
      function( error, result) { 
        if ( error ) {
          debugger;
          console.log ( error ); //info about what went wrong
        }
        if ( result ) {
          FlowRouter.go('/subscribed/');
        }
      }
      //{validate: false}
    );

  },

  render() {
  	return <div id='home'>
    <h1>Simply push notification to your device!</h1>

    <h3>Try now</h3>

    <form onSubmit={this.submitTel}>
      <input type="tel" ref="usrtel" placeholder="Enter tel here"/>
      <input type="submit"/>
    </form>

	</div>;
  }
});

