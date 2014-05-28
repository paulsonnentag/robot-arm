'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

gulp.task('browserify', function () {
  return browserify()
    .add('./client/src/app.js')
    .bundle({debug: true})
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/build/'));
});

gulp.task('watch', function () {
  var server = livereload();

  var reload = function (file) {
    server.changed(file.path);
  };

  gulp.watch(['client/src/**'], ['browserify']);
  gulp.watch(['client/build/**', 'client/assets/**']).on('change', reload);
});