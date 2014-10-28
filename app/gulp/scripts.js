var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Adds sourcemap to minified code so debugger gives meaninful info...
var uglify = require('gulp-uglify'); // Minifies your JavaScript
var ngAnnotate = require('gulp-ng-annotate'); // Annotates JavaScript to prevent minification screw up...


// Concat all *.js file in ./ng into a single ./assets/app.js file...
gulp.task('js', function(){

	console.log('Concatenating ./ng/*.js into ./assets/app.js...');

	// Be sure ng/module.js is contcatenated first,
	// then the order of the others does not
	// matter due to Angular's dependency injection...
	gulp.src(['ng/module.js', 'ng/**/*.js'])
	 //.pipe(sourcemaps.init())
	    .pipe(concat('app.js', {newLine: '\r\n'}))
	    //.pipe(concat('app.js'))
	 	//.pipe(ngAnnotate())
	 	//.pipe(uglify())
     //.pipe(sourcemaps.write())
	 .pipe(gulp.dest('assets'));

});
