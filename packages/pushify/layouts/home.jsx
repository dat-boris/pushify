HomeLayout = React.createClass({
  submitTel (event) {

    event.preventDefault();

    // Find the text field via the React ref
    var tel = ReactDOM.findDOMNode(this.refs.usrtel).value.trim();

    // generate a random string of length 5
    // from http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    var random_slug = Math.random().toString(36).substring(2,7);

    Meteor.call("submit_tel", {
      'useragent' : navigator.userAgent,
      'tel' : tel,
      'slugname' : random_slug,
    },
    function( error, result) { 
      if ( error ) {
        console.error ( error ); //info about what went wrong
        throw error;
      } else {
        FlowRouter.go('/subscribed/'+random_slug);
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
      </form>
    </section>

	</div>;
  }
});

