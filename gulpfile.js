'use strict';

var browserify   = require('browserify');
var gulp         = require('gulp');
var handleErrors = require('gulp-handle-errors');
var livereload = require('gulp-livereload');
var source       = require('vinyl-source-stream');


gulp.task('browserify', function(){
  return browserify()
    .add('./src/app.js')
    .bundle({debug: true})
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  var server = livereload();

  var reload = function(file) {
    server.changed(file.path);
  };

  gulp.watch(['src/**'], ['browserify']);
  gulp.watch(['build/**', 'assets/**']).on('change', reload);
});