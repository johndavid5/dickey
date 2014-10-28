var gulp = require('gulp'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// Add a file watcher so JavaScript is automatically rebuilt
// every time there is a change...
gulp.task('watch:js', ['js'], function(){
	// gulp.watch(file_path_to_watch, dependencies_list);
	// Put 'js' into dependencies list so it will automaticall
	// build the JavaScript even before a file changes...
	gulp.watch('ng/**/*.js', ['js']);
});

// Concat all *.js file in ./ng into a single ./assets/app.js file...
gulp.task('js', function(){
	console.log('Concatenating ./ng/*.js into ./assets/app.js...');

	// Be sure ng/module.js is contcatenated first,
	// then the order of the others does not
	// matter due to Angular's dependency injection...
	gulp.src(['ng/module.js', 'ng/**/*.js'])
	 .pipe(concat('app.js'))
	 .pipe(ngAnnotate())
	 .pipe(uglify())
	 .pipe(gulp.dest('assets'))
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
