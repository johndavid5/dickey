var gulp = require('gulp');
var debug = require('gulp-debug');
var tap = require('gulp-tap');
var path = require('path');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Adds sourcemap to minified code so debugger gives meaninful info...
var uglify = require('gulp-uglify'); // Minifies your JavaScript
var ngAnnotate = require('gulp-ng-annotate'); // Annotates JavaScript to prevent minification screw up...


// Concat all *.js file in ./ng into a single ./assets/app.js file...
gulp.task('js', function(){

	console.log('* gulp/script.js: Concatenating ./ng/*.js into ./assets/app.js...');

	var count = 0;

	// Be sure ng/module.js is concatenated first,
	// then the order of the others does not
	// matter due to Angular's dependency injection...
	gulp.src(['ng/module.js', 'ng/**/*.js'])
		//.pipe(debug({verbose: true}))
		.pipe(tap(function (file,t) {
			count++;
            console.log("* gulp/scripts.js: #" + count + ": concatenating './ng/" + path.basename(file.path) + "' into app.js...");
            //console.log("* gulp/scripts.js: #" + count + ": concatenating '" + file.path + "' into app.js...");
            // Do something with the file name
        }))
	    //.pipe(console.log("* gulp/script.js: " + this + "..."))
		//.pipe(sourcemaps.init())
	    .pipe(concat('app.js', {newLine: '\r\n'}))
	    //.pipe(concat('app.js'))
	 	//.pipe(ngAnnotate())
	 	//.pipe(uglify())
     //.pipe(sourcemaps.write())
	 .pipe(gulp.dest('assets'));

});
