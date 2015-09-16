module.exports = function(config){
	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			'assets/bower/angular/angular.js',
			'assets/bower/angular-route/angular-route.js',
			'assets/bower/angular-mocks/angular-mocks.js',
			'ng/**/module.js',
			'ng/**/*.js',
			'test/ng/**/*.spec.js'
		],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false
	});
};
