run-server:
	meteor run --settings settings.json

test:
	VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter packages/pushify --velocity

test-browser:
	VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter packages/pushify

deploy:
	meteor deploy pushify.meteor.com --settings settings.json