var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var htmlify = require('gulp-angular-htmlify');
var templateCache = require('gulp-angular-templatecache');
var path = require('path');
var less = require('gulp-less');

var paths = {
  scripts: ['common/**/*.js', 'app/**/*.js'],
  templates: 'app/**/*.jade',
  // images: 'client/img/**/*',
  css: [ 'styles/**/*.less', 'app/**/*.less'],
  root: [ '../assets/js/' , '../assets/styles/']
};

gulp.task('less', function () {
    // gulp.src('styles/style.scss')
    //     .pipe(sass())
    //     .pipe(concat('style.css'))
    //     .pipe(gulp.dest(paths.root[1]));


  gulp.src(paths.css)
    .pipe(concat('style.less'))
    .pipe(less({
      // paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
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

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js-common', 'js-app']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.css, ['less']);
});


gulp.task('default', ['js-app', 'templates', 'js-common', 'less', 'watch']);