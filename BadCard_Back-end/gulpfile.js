var _ 		= require('gulp-load-plugins')({ rename: {'gulp-minify-css': 'minifyCSS'} }),
   	gutil 	= require('gulp-util'),
	gulp 	= require('gulp'),
	del 	= require('del'),
	mkdirp 	= require('mkdirp'),
	fs 		= require('fs'),
	sequence = require('run-sequence');

/* Clean out existing files */
gulp.task('clean:fonts', function(cb){
	del(['public/fonts'], cb)
});

gulp.task('clean:js', function(cb){
	del(['public/scripts'], cb);
});

gulp.task('clean:css', function(cb){
	del(['public/styles'], cb);
});

gulp.task('clean:html', function(cb){
	del(['public/*.html'], cb);
})

/* Re-create directory structure */
gulp.task('structure:fonts', function(cb){
	mkdirp('public/fonts', function(err){
		if(err) gutil.log(err);
		else gutil.log('Built public/fonts directory')
		cb()	
	})
});

gulp.task('structure:js', function(cb){
	mkdirp('public/scripts', function(err){
		if(err) gutil.log(err);
		else gutil.log('Built public/scripts directory')
		cb()	
	})
});

gulp.task('structure:css', function(cb){
	mkdirp('public/styles', function(err){
		if(err) gutil.log(err);
		else gutil.log('Built public/styles directory')
		cb()
	})
});

gulp.task('serve', ['build'], function(){

	_.nodemon({
		script: 'index.js',
		ext : 'js html css',
		env : {'NODE_ENV' : 'development'}
	})
	gutil.log('Serving index.js on port 3000');
});

gulp.task('build:scss', function(){

	return 	gulp.src('public/styles/*.scss')
			.pipe(_.sourcemaps.init())
			.pipe(_.sass())
			.pipe(_.sourcemaps.write())
			.pipe(gulp.dest('public/styles'))
});


gulp.task('minify:css', ['build:scss'], function(){
	return 	gulp.src([
			'./app/styles/vendor/**/*.css',
			'./app/styles/vendor/*.css',
			'./app/styles/*.css'
			])
			.pipe(_.minifyCSS())
			.pipe(_.concat('app.css'))
			.pipe(gulp.dest('./public/styles'));

});

gulp.task('build:js', function(){
	gulp.src(['./app/scripts/**/**/*.js'])	
		.pipe(gulp.dest('./public/scripts'));
})

gulp.task('build:fonts', function(){
	gulp.src('./app/fonts/*')
		.pipe(gulp.dest('./public/fonts'));
})

gulp.task('build:html', function(){
	var target = gulp.src('./app/*.html');
	var series = require('stream-series');
	
	var jQueryStream 	= gulp.src(['./app/scripts/vendor/jquery/*.js']),
		JQueryUIStream 	= gulp.src(['./app/scripts/vendor/jquery-ui/*.js']),
		vendorStream 	= gulp.src(['./app/scripts/vendor/*.js']),
		libStream 	 	= gulp.src(['./app/scripts/lib/*.js']),
		filterStream 	= gulp.src(['./app/scripts/filters/*.js']);


	return 	target.pipe(_.inject(series(jQueryStream, JQueryUIStream, vendorStream, libStream, filterStream), 
			{cwd: __dirname + '/app/', ignorePath: '/app/', addRootSlash: false}))
			.pipe(gulp.dest('./public/'))
});


gulp.task('clean', ['clean:fonts', 'clean:js', 'clean:css', 'clean:html']);
gulp.task('structure', ['structure:fonts', 'structure:js', 'structure:css']);
gulp.task('build', function(){
	sequence('clean', 'structure', 'build:fonts', 'build:js', 'build:scss', 'minify:css', 'build:html');
})

gulp.task('default', ['serve']);
