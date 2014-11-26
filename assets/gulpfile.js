var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
// var mainBowerFiles = require('main-bower-files');


var paths = {
  scripts: ['/common/**/*.js', '/app/**/*.js'],
  templates: '/app/**/*.jade',
  // images: 'client/img/**/*',
  css: '/styles/**/*.scss'
};


// gulp.task('bower', function() {
//     return gulp.src(mainBowerFiles())
//         .pipe(gulp.dest('js/bower.js'))
// });

gulp.task('sass', function () {
    gulp.src(paths.css)
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('js-common', function() {
  gulp.src(paths.scripts[0])
    .pipe(concat('/js/common.js'))
    .pipe(gulp.dest('common/'))
});

gulp.task('js-app', function() {
  gulp.src(paths.scripts[1])
    .pipe(concat('/js/app.js'))
    .pipe(gulp.dest('common/'))
});

gulp.task('templates', function() {
   gulp.src(paths.templates)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('partials/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js-common', 'js-app']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.css, ['sass']);
});


gulp.task('default', ['js-app', 'templates', 'js-common', 'sass', 'watch']);