var gulp = require('gulp'); 

gulp.task('welcome', function(){
	console.log('Welcome to gulp!');
});

gulp.task('hello', 
	['welcome'], /* <== List of Dependencies */
	function(){
		console.log('Hello, World!');
	}
);
