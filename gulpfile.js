const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

// DEV
function htmlToApp() {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

function fontsToApp() {
  return gulp.src(['./src/fonts/*'])
    .pipe(gulp.dest('./build/fonts'))
}

function imgToApp() {
  return gulp.src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/**.svg', './src/img/**.ico'])
    .pipe(gulp.dest('./build/img'))
}

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
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('./src/scripts/main.js')
    .pipe(uglify({
      toplevel: true,
    }))
    .pipe(gulp.dest('./build/scripts'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
  });

  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/scripts/**/*.js', scripts);
  gulp.watch('./src/*.html', htmlToApp);
  gulp.watch('./src/fonts/*', fontsToApp);
  gulp.watch('./src/img/**.jpg', imgToApp);
  gulp.watch('./src/img/**.jpeg', imgToApp);
  gulp.watch('./src/img/**.png', imgToApp);
  gulp.watch('./src/img/**.svg', imgToApp);
}

function clean() {
  return del(['build/*']);
}

gulp.task('imgToApp', imgToApp);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('htmlToApp', htmlToApp);
gulp.task('fontsToApp', fontsToApp);
gulp.task('watch', watch);

gulp.task('default',
  gulp.series(clean, gulp.parallel(htmlToApp, fontsToApp, imgToApp, styles, scripts), 'watch')
)

// BUILD

gulp.task('build',
  gulp.series(clean, gulp.parallel(htmlToApp, fontsToApp, imgToApp, styles, scripts))
)