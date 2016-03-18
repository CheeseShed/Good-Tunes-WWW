'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('sass', function () {
    return gulp
    .src('src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch('src/css/**/*.scss', ['sass']);
});
