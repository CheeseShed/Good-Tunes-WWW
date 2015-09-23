'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp
    .src('src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass'], function () {
  gulp.watch('src/css/**/*.scss', ['sass']);
});
