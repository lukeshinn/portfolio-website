var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');
var webpack = require('webpack-stream');
var rename       = require('gulp-rename');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

// =========================================================
///  Development Taska
// =========================================================

// ========================
///  Start browserSync Server
// ========================
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

// ========================
///  Sass
// ========================
gulp.task('sass', function() {
  return gulp.src('app/scss/stylesheet.scss') // Centralized stylesheet with imports
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// ========================
///  .JS
// ========================
gulp.task('js', function(){
  var lint = gulp.src('app/js/main.js')
    .pipe(eslint());
    //.pipe(eslint.reporter('default'));

  var js = gulp.src('app/js/main.js')
    .pipe(webpack({
      mode: "development",
      target: 'web',
      externals: {
        $: 'jQuery',
        jquery: 'jQuery',
      }
    }).on("error", notify.onError(function (error) {
      return "Error - webpack: " + error.message;
    })))
    .pipe(rename({basename: 'site', suffix: '.min'}))
    .pipe(gulp.dest('app/js'))
    .pipe(notify({ message: "js file: <%= file.relative %>"}));

  return lint,js;
});


// ========================
///  Watchers
// ========================
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// =========================================================
///  Optimization Tasks
// =========================================================

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// ========================
///  Optomizing Images
// ========================
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// ========================
///  Copying Fonts
// ========================
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// ========================
///  Cleaning
// ========================
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// =========================================================
///  Build Sequence
// =========================================================

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
})
