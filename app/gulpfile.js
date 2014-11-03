var gulp = require('gulp'); 
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps'); // Adds sourcemap to minified code so debugger gives meaninful info...
//var uglify = require('gulp-uglify'); // Minifies your JavaScript
//var ngAnnotate = require('gulp-ng-annotate'); // Annotates JavaScript to prevent minification screw up...

// Automatically call require() for any file in ./gulp/... 
var fs = require('fs');
fs.readdirSync(__dirname + '/gulp').forEach(
	function(task){
		var requirer = './gulp/' + task;
		//console.log("requirer = '" + requirer + "'...");
	
	if( requirer.indexOf("~") < 0 && requirer.indexOf(".js") == requirer.length-3 ){	
			console.log("* ./gulpfile.js: require('" + requirer + "')...");
			require('./gulp/' + task);
		}
	}
);

// Or, until we get it to work properly,
// include each one individually...
//require('./gulp/css.js');
//require('./gulp/scripts.js');


// Add a file watcher so JavaScript is automatically rebuilt
// every time there is a change...
gulp.task('watch:js', ['js'], function(){
	// gulp.watch(file_path_to_watch, dependencies_list);
	// Put 'js' into dependencies list so it will automaticall
	// build the JavaScript even before a file changes...
	gulp.watch('ng/**/*.js', ['js']);
});

gulp.task('watch:css', function(){
	gulp.watch('css/**/*.styl', ['css']);
});

gulp.task('welcome', function(){
	console.log('Welcome to gulp!');
});

gulp.task('dev', ['watch:css', 'watch:js', 'dev:server']);

gulp.task('hello', 
	['welcome'], /* <== List of Dependencies */
	function(){
		console.log('Hello, World!');
	}
);
