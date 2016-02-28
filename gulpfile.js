var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    changed       = require('gulp-changed'),
    concat        = require('gulp-concat'),
    imagemin      = require('gulp-imagemin'),
    imageResize   = require('gulp-image-resize'),
    jshint        = require('gulp-jshint'),
    less          = require('gulp-less'),
    minify        = require('gulp-minify-css'),
    os            = require('os'),
    parallel      = require('concurrent-transform'),
    plumber       = require('gulp-plumber'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify'),
    gutil         = require('gulp-util');

/**
 * Build Less files.
 *
 * @param  {string} src           Sources files location
 * @param  {string} filename      Build result filename
 * @param  {string} dest          Build result location
 * @param  {bool}   withSourceMap Generate with sourcemaps or not
 * @return {Gulp}
 */
gulp.buildLess = function(src, filename, dest, withSourceMap) {
  if (withSourceMap === undefined || withSourceMap === null) {
    withSourceMap = gutil.env.type !== 'production';
  }

  return gulp.src(src)
    .pipe(plumber())
    .pipe(withSourceMap ? sourcemaps.init() : gutil.noop())
      .pipe(less())
      .pipe(concat(filename))
      .pipe(minify())
    .pipe(withSourceMap ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(dest));
};

/**
 * Build js files.
 *
 * @param  {string} src           Sources files location
 * @param  {string} filename      Build result filename
 * @param  {string} dest          Build result location
 * @param  {bool}   validate      Validate the js files
 * @param  {bool}   withSourceMap Generate with sourcemaps or not
 * @return {Gulp}
 */
gulp.buildJs = function(src, filename, dest, validate, withSourceMap) {
  if (withSourceMap === undefined || withSourceMap === null) {
    withSourceMap = gutil.env.type !== 'production';
  }

  return gulp.src(src)
    .pipe(plumber())
    .pipe(validate === true ? jshint() : gutil.noop())
    .pipe(validate === true ? jshint.reporter('jshint-stylish') : gutil.noop())
    .pipe(withSourceMap ? sourcemaps.init() : gutil.noop())
      .pipe(concat(filename))
      .pipe(uglify())
    .pipe(withSourceMap ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(dest));
};

/**
 * Build images.
 *
 * @param  {string} src       Sources file location
 * @param  {string} dest      Build result location
 * @param  {int} maxWidth     Maximum image width
 * @param  {int} maxHeight    Maximum image height
 * @param  {float} quality    JPG image quality
 * @param  {string} suffix    Suffix to be added to compressed image
 * @return {Gulp}
 */
gulp.buildImages = function(src, dest, maxWidth, maxHeight, quality, suffix) {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(parallel(
      imageResize({
        width : maxWidth,
        height: maxHeight,
        crop: true,
        upscale : false,
        quality: quality
      }), os.cpus().length))
    .pipe(suffix ? rename(function(path) { path.basename += suffix; }) : gutil.noop())
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(dest));
};

gulp.task('css-critical', function() {
  return gulp.buildLess(
    '_assets/less/critical/critical.less',
    'critical.min.css', '_includes/assets', false);
});

gulp.task('css-theme', function() {
  return gulp.buildLess([
      'node_modules/normalize.css/normalize.css',
      '_assets/less/theme/theme.less'
    ], 'theme.min.css', '_site/assets/css');
});

gulp.task('js-load-css', function() {
  return gulp.buildJs(
    'node_modules/fg-loadcss/src/loadCSS.js',
    'load-css.min.js', '_includes/assets', true, false);
});

gulp.task('js-disqus', function() {
  return gulp.buildJs(
    '_assets/js/disqus.js',
    'disqus.min.js', '_includes/assets', true, false);
});

gulp.task('js-google-analytics', function() {
  return gulp.buildJs(
    '_assets/js/google-analytics.js',
    'google-analytics.min.js', '_includes/assets', false, false);
});

gulp.task('js-theme', function() {
  return gulp.buildJs(
    '_assets/js/theme.js',
    'theme.min.js', '_site/assets/js', true);
});

gulp.task('featured-images', function() {
  return gulp.buildImages(
    '_assets/img/**/*-cover.jpg',
    '_site/assets/img', 1800, 450, 0.6, '-hero'
  );
});

gulp.task('hires-featured-images', function() {
  return gulp.buildImages(
    '_assets/img/**/*-cover-hires.jpg',
    '_site/assets/img', 1800, 600, 0.8, '-hero'
  );
});

gulp.task('all-images', function() {
  return gulp.buildImages(
    '_assets/img/**/*.jpg',
    '_site/assets/img', 1200, 700, 0.6
  );
});

gulp.task('default', ['css', 'js', 'images']);

gulp.task('css', ['css-critical', 'css-theme']);

gulp.task('js', ['js-load-css', 'js-disqus', 'js-google-analytics', 'js-theme']);

gulp.task('images', ['featured-images', 'hires-featured-images', 'all-images']);

gulp.task('watch', function() {
  gulp.watch('_assets/less/**/*.less', ['css']);
  gulp.watch('_assets/js/**/*.js', ['js']);
  gulp.watch('_assets/img/**/*', ['images']);
});
