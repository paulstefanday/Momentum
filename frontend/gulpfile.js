var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var htmlify = require('gulp-angular-htmlify');
var templateCache = require('gulp-angular-templatecache');
var path = require('path');
var less = require('gulp-less');
var jasmine = require('gulp-jasmine');



var paths = {
  scripts: ['common/**/*.js', 'app/**/*.js'],
  templates: 'app/**/*.jade',
  css: [ 'styles/**/*.less', 'app/**/*.less'],
  root: [ '../assets/js/' , '../assets/styles/'],
  testing: ['../tests/api/**/*.js']
};

gulp.task('less', function () {
  gulp.src(paths.css)
    .pipe(concat('style.less'))
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.root[1]));
});

gulp.task('js-common', function() {
  gulp.src(paths.scripts[0])
    .pipe(concat('common.js'))
    .pipe(gulp.dest(paths.root[0]))
});

gulp.task('js-app', function() {
  gulp.src(paths.scripts[1])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.root[0]))
});

gulp.task('templates', function() {
gulp.src(paths.templates)
    .pipe(jade())
    .pipe(htmlify())
    .pipe(templateCache({
        root: "/partials/",
        standalone: true,
        module: "templates",
      }))
    .pipe(gulp.dest(paths.root[0]));
});

gulp.task('api-testing', function () {
    return gulp.src(paths.testing[0])
        .pipe(jasmine());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js-common', 'js-app']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.css, ['less']);
});


gulp.task('default', ['js-app', 'templates', 'js-common', 'less', 'watch']);