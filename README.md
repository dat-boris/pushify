# Pushify

Simple push notification subscription service

![XKCD - compiling](https://imgs.xkcd.com/comics/compiling.png)

Imagine getting push notifiaction when the compilation is done!

![Mockup 1](/mobile.png)


# Project description

![Mockup 1](/mockup.png)



# Testing

We use Velocity + Jasmine for testing.  To run the test, use:

	# for setting up velocity too
	# npm install velocity-cli -g
	make test

See https://meteor-testing.readme.io/v1.0/docs/getting-started-with-jasmine for more information, and example at https://github.com/AdamBrodzinski/react-meteor-tests


## Setting up Codeship CI

To get it running on codeship, you will need to setup meteor without using sudo.  To do this, run:

```
git clone https://github.com/meteor/meteor.git ~/meteor
export PATH=~/meteor/:$PATH
npm install -g meteorite
```
(from https://meteorhacks.com/continuos-integration-for-meteor-apps.html)

# Getting started

The project runs `Metero` with `react.js` front-end.  To run the project:

```
make run-server
``` 

This will run the server on http://localhost:3000

# Meteor best practice readings

* Boiler plate - https://github.com/matteodem/meteor-boilerplate
* Scaffolding structure - http://meteortips.com/first-meteor-tutorial/structure/
