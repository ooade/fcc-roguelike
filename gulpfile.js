/** require gulp **/
const gulp = require('gulp');

/** require gulp-sass **/
const sass = require('gulp-sass');

/** Adds a task "sass" **/
gulp.task('sass', () => {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

/** Adds a task "sass:watch" **/
gulp.task('sass:watch', () => {
  return gulp.watch('./sass/**/*.scss', ['sass']);
});
