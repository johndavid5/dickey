exports.config = {
	framework: 'mocha',
	specs: [
		'tests/e2e/**/*.spec.js'
	],
	mochaOpts: {
		enableTimeouts: false
		// The 'enableTimeouts' setting is necessary
		// to avoid timeout bugs observed in the past with Mocha while using
		// Protractor...may no longer be necessary...
	}
};
