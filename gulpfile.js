var gulp = require('gulp'),
jshint = require('gulp-jshint'),
sass = require('gulp-ruby-sass'),
sourcemaps = require('gulp-sourcemaps'),
webserver = require('gulp-webserver');

gulp.task('js', function() {
  return gulp.src('builds/sass-template/js/myscript.js')
  .pipe(jshint('./.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  return sass('process/sass/style.scss', {
    sourcemap: true,
    style: 'expanded'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('builds/sass-template/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/sass-template/js/**/*', ['js']);
  gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('builds/sass-template/')
  .pipe(webserver({
    livereload: true,
    open: true
  }));
});

gulp.task('default', ['sass', 'watch', 'webserver']);
