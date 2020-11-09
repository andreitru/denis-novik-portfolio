const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

function styles() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./build/styles'))
}

function scripts() {
  return gulp.src('./src/scripts/main.js')
    .pipe(uglify({
      toplevel: true,
    }))
    .pipe(gulp.dest('./build/scripts'))
}

function watch() {
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/scripts/**/*.js', scripts);
}

function clean() {
  return del(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('default',
  gulp.series(clean, gulp.parallel(styles, scripts), 'watch')
)