ChromeLayout = React.createClass({
  render() {
    var useragent = navigator.userAgent;
  	return <div className='content'>
    <section id="about" className="extra-top">
      <h1>Chrome browser needed!</h1>

      <p>We will need to install chrome browser in order to support the push notification</p>

      <a href="https://www.google.com/chrome/browser/mobile/index.html">Get It Now!</a>

      <p>UserAgent: {useragent}</p>
    </section>

	</div>;
  }
});

