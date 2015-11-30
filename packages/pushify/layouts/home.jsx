HomeLayout = React.createClass({
  submitTel (event) {

    event.preventDefault();

    // Find the text field via the React ref
    var tel = ReactDOM.findDOMNode(this.refs.usrtel).value.trim();

    Meteor.call("submit_tel", {
      'useragent' : navigator.userAgent,
      'tel' : tel,
      'slugname' : Math.random().toString(),
    },
    function( error, result) { 
      if ( error ) {
        console.error ( error ); //info about what went wrong
        debugger;
          throw error;
      } else {
        FlowRouter.go('/subscribed/');
      }
    }
    )

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

