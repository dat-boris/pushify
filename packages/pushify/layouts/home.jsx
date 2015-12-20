HomeLayout = React.createClass({
  submitTel (event) {

    event.preventDefault();

    // Find the text field via the React ref
    var tel = ReactDOM.findDOMNode(this.refs.usrtel).value.trim();

    Meteor.call("submit_tel", {
      'useragent' : navigator.userAgent,
      'tel' : tel,
      'slugname' : "test-slug",
    },
    function( error, result) { 
      if ( error ) {
        console.error ( error ); //info about what went wrong
        throw error;
      } else {
        FlowRouter.go('/subscribed/');
      }
    }
    )

  },

  render() {
  	return <div className='content'>
    <section id="about" className="extra-top">
      <h1>Simply push notification to your device!</h1>

      <p>Try now</p>

      <form onSubmit={this.submitTel}>
        <input type="tel" ref="usrtel" placeholder="Enter tel here"/>
        <input type="submit"/>
      </form>
    </section>

	</div>;
  }
});

