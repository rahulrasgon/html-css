var gulp = require('gulp');
var compass = require('gulp-compass');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('images',  function() {
    return gulp.src('images/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('images/'));
});

gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir:'./'
      },
   })
})


gulp.task('compass', function() {
  gulp.src('scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('styles', function() {

    gulp.src(['css/style.css'])
    .pipe(browserSync.reload({
      stream: true
   }))
});


gulp.task('default', ['compass', 'browserSync', 'styles', 'images'], function() {
    gulp.watch("scss/*.scss", ['compass']);
    gulp.watch("js/*.js", ['jshint']);
    gulp.watch("css/*.css", ['styles']);
});
