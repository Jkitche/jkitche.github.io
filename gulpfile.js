var gulp        = require('gulp'),
    util        = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    livereload  = require('gulp-livereload'),
    minifyCSS   = require('gulp-minify-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename');
 
var stylesPath = "styles";

// Minify + Compile all LESS and CSS
// -----------------------------------
gulp.task('styles', function() {
    gulp.src(stylesPath + '/style.less', {base: './'})
      .pipe(sourcemaps.init())
    	.pipe(less().on('error', util.log))
      .pipe(minifyCSS())
      .pipe(rename('compiled.css'))
      .pipe(sourcemaps.write('sourcemap'))
      .pipe(gulp.dest(stylesPath))
      .pipe(livereload());
});
 

// Build
// -----------------------------------
gulp.task('build', function(){
	gulp.src('/styles/styles.less', {base: './'})
    	.pipe(less().on('error', util.log))
        .pipe(minifyCSS())
        .pipe(rename('compiled.css'))
        .pipe(gulp.dest(stylesPath));
});

gulp.task('minifyappjs', function() {
	gulp.src('/js/')
		.pipe(sourcemaps.init())
		.pipe(concat('dungeoneer.min.js'))
    	.pipe(uglify())
    	.pipe(sourcemaps.write('../maps'))
    	.pipe(gulp.dest('/js/compiled/'))
    	.pipe(livereload());
});


// Watch Task
// -----------------------------------
gulp.task('watch', function() {
    // LESS
    // -----------------------------------
    gulp.watch(stylesPath + '/**/*.less', function() {
        gulp.run('styles');
    });
    
    //JS
    // -----------------------------------
    gulp.watch('/*.js', function() {
        gulp.run('minifyappjs');
    });
    
    // LiveReload
    // -----------------------------------
    var server = livereload();
    livereload.listen();
    gulp.watch([
        './**/*.html',
    ]).on('change', livereload.changed);
});

// Put it all together
// -----------------------------------
gulp.task('default', ['watch']);