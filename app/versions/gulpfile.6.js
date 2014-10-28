var gulp = require('gulp'); 
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps'); // Adds sourcemap to minified code so debugger gives meaninful info...
var uglify = require('gulp-uglify'); // Minifies your JavaScript
var ngAnnotate = require('gulp-ng-annotate'); // Annotates JavaScript to prevent minification screw up...
var run = require('gulp-run'); // JDA-Lets you run command-line stuff from gulp..

var D2UConverter = require('dos2unix').dos2unix;

var d2u = new D2UConverter({ glob: { cwd: __dirname } })
  .on('error', function(err) {
    console.error(err);
  })
  .on('end', function(stats) {
    console.log(stats);
  });
//d2u.process(['docs/*']);


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
	 //   .pipe(ngAnnotate())
	 //   .pipe(uglify())
     //.pipe(sourcemaps.write())
	 .pipe(gulp.dest('assets'));

	//var command_line = 'dos2unix ' + __dirname() + '/ng/app.js';
	//var command_line = 'dos2unix ' + 'c:/inetpub/wwwroot/dickey/app/node' + '/ng/app.js';
	//var command_line = 'dos2unix assets/app.js';
	//var command_line = 'dos2unix ' + 'c:\\inetpub\\wwwroot\\dickey\\app\\node' + '\\assets\\app.js';
	//var command_line = "dos2unix /cygdrive/c/inetpub/wwwroot/dickey/app/node/assets/app.js"
	//console.log('Executing "' + command_line + '"...');
	//run( command_line );

	//d2u.process('assets/app.js');
});

// Add a file watcher so JavaScript is automatically rebuilt
// every time there is a change...
gulp.task('watch:js', ['js'], function(){
	// gulp.watch(file_path_to_watch, dependencies_list);
	// Put 'js' into dependencies list so it will automaticall
	// build the JavaScript even before a file changes...
	gulp.watch('ng/**/*.js', ['js']);
});

gulp.task('welcome', function(){
	console.log('Welcome to gulp!');
});

gulp.task('hello', 
	['welcome'], /* <== List of Dependencies */
	function(){
		console.log('Hello, World!');
	}
);
