run-server:
	meteor

test:
	echo "WARNING: this is still broken"
	velocity test-package packages/pushify --ci

test-browser:
	VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter packages/pushify
