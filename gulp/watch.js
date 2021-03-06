'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['config:dev'], function () {
  gulp.watch([
  	'!' + paths.src + '/lib/**',
    paths.src + '/*.html',
    paths.src + '/{app,components}/**/*.scss',
    paths.src + '/{app,components}/**/*.js',
    'bower.json'
  ], ['inject']);
});
