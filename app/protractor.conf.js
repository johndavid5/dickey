exports.config = {
	framework: 'mocha',
	specs: [
		'test/e2e/**/*.spec.js'
	],
	mochaOpts: {
		//enableTimeouts: false
		// The 'enableTimeouts' setting is necessary
		// to avoid timeout bugs observed in the past with Mocha while using
		// Protractor...may no longer be necessary...
	},
	onPrepare: function(){
		//process.env.PORT = 3002; // Set alternate PORT environmental variable
								 //	for end-to-end testing, which will be read by server.js...
		//require('./server'); // Then start up our own server.js on our alternate port...
	},
};
