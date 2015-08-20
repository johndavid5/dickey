var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('dev:cluster', function(){
	nodemon({
		script: 'cluster.js',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	})
});
