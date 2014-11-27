var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var htmlify = require('gulp-angular-htmlify');
var templateCache = require('gulp-angular-templatecache');
// var mainBowerFiles = require('main-bower-files');
// gulp.task('bower', function() {
//     return gulp.src(mainBowerFiles())
//         .pipe(gulp.dest('js/bower.js'))
// });

var paths = {
  scripts: ['common/**/*.js', 'app/**/*.js'],
  templates: 'app/**/*.jade',
  // images: 'client/img/**/*',
  css: 'styles/**/*.scss',
  root: [ '../assets/js/' , '../assets/styles/']
};

gulp.task('sass', function () {
    gulp.src(paths.css)
        .pipe(sass())
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
  gulp.watch(paths.css, ['sass']);
});


gulp.task('default', ['js-app', 'templates', 'js-common', 'sass', 'watch']);