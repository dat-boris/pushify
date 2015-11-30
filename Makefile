run-server:
	meteor run --settings settings.json

test:
	echo "WARNING: this is still broken"
	velocity test-package packages/pushify --ci

test-browser:
	VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter packages/pushify

deploy:
	meteor deploy pushify.meteor.com --settings settings.json