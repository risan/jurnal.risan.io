var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var os = require('os');
var parallel = require('concurrent-transform');

var JS_DIR = '_site/assets/css';
var CSS_DIR = '_site/assets/css';
var IMG_DIR = '_site/assets/img';
var TEMPLATE_ASSETS_DIR = '_includes/assets';

gulp.task('theme.js', function() {
  return buildJs({
    source: [
      '_assets/js/theme.js',
    ],
    filename: 'theme.min.js',
    destination: JS_DIR,
    validate: true,
    sourcemaps: true,
  });
});

gulp.task('loadCSS.js', function() {
  return buildJs({
    source: [
      'node_modules/fg-loadcss/src/loadCSS.js',
    ],
    filename: 'load-css.min.js',
    destination: TEMPLATE_ASSETS_DIR,
    validate: false,
    sourcemaps: false,
  });
});

gulp.task('disqus.js', function() {
  return buildJs({
    source: [
      '_assets/js/disqus.js',
    ],
    filename: 'disqus.min.js',
    destination: TEMPLATE_ASSETS_DIR,
    validate: false,
    sourcemaps: false,
  });
});

gulp.task('ga.js', function() {
  return buildJs({
    source: [
      '_assets/js/google-analytics.js',
    ],
    filename: 'google-analytics.min.js',
    destination: TEMPLATE_ASSETS_DIR,
    validate: false,
    sourcemaps: false,
  });
});

gulp.task('theme.css', function() {
  return buildCss({
    source: [
      'node_modules/normalize.css/normalize.css',
      '_assets/less/theme/theme.less',
    ],
    filename: 'theme.min.css',
    destination: CSS_DIR,
    sourcemaps: true,
  });
});

gulp.task('critical.css', function() {
  return buildCss({
    source: [
      '_assets/less/critical/critical.less',
    ],
    filename: 'critical.min.css',
    destination: TEMPLATE_ASSETS_DIR,
    sourcemaps: false,
  });
});

gulp.task('featured.img', function() {
  return buildImages({
    source: [
      '_assets/img/**/*-cover.jpg',
    ],
    destination: IMG_DIR,
    maxWidth: 1800,
    maxWidth: 450,
    quality: 0.6,
    suffix: '-hero',
  });
});

gulp.task('hires.featured.img', function() {
  return buildImages({
    source: [
      '_assets/img/**/*-cover-hires.jpg',
    ],
    destination: IMG_DIR,
    maxWidth: 1800,
    maxWidth: 600,
    quality: 0.8,
    suffix: '-hero',
  });
});

gulp.task('post.img', function() {
  return buildImages({
    source: [
      '_assets/img/**/*.jpg',
    ],
    destination: IMG_DIR,
    maxWidth: 1200,
    maxWidth: 700,
    quality: 0.6,
  });
});

gulp.task('default', ['js', 'css', 'img']);

gulp.task('js', ['theme.js', 'loadCSS.js', 'disqus.js', 'ga.js']);

gulp.task('css', ['theme.css', 'critical.css']);

gulp.task('img', ['featured.img', 'hires.featured.img', 'post.img']);

gulp.task('watch', function() {
  gulp.watch('_assets/less/**/*.less', ['css']);
  gulp.watch('_assets/js/**/*.js', ['js']);
  gulp.watch('_assets/img/**/*', ['img']);
});

function buildJs(options) {
  return gulp.src(options.source)
    .pipe(plugins.plumber())
    .pipe(options.validate ? plugins.jshint() : nope())
    .pipe(options.validate ? plugins.jshint.reporter('jshint-stylish') : nope())
    .pipe(options.validate ? plugins.jscs() : nope())
    .pipe(options.validate ? plugins.jscs.reporter() : nope())
    .pipe(initSourcemaps())
      .pipe(plugins.concat(options.filename))
      .pipe(plugins.uglify())
    .pipe(options.sourcemaps ? writeSourcemaps() : nope())
    .pipe(gulp.dest(options.destination));
}

function buildCss(options) {
  return gulp.src(options.source)
    .pipe(plugins.plumber())
    .pipe(initSourcemaps())
      .pipe(plugins.less())
      .pipe(plugins.concat(options.filename))
      .pipe(plugins.cssnano())
    .pipe(options.sourcemaps ? writeSourcemaps() : nope())
    .pipe(gulp.dest(options.destination));
};

function buildImages(options) {
  return gulp.src(options.source)
    .pipe(plugins.changed(options.destination))
    .pipe(parallel(
      plugins.imageResize({
        width : options.maxWidth,
        height: options.maxHeight,
        crop: true,
        upscale : false,
        quality: options.quality
      }), os.cpus().length))
    .pipe(options.suffix ? plugins.rename(function(path) { path.basename += options.suffix; }) : nope())
    .pipe(plugins.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(options.destination));
};

function copy(src, dest) {
  return gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(dest));
};

function initSourcemaps() {
  if (!isProduction()) {
    return plugins.sourcemaps.init({ loadMaps: true });
  }

  return nope();
}

function writeSourcemaps() {
  if (!isProduction()) {
    return plugins.sourcemaps.write('.');
  }

  return nope();
}

function isProduction() {
  return plugins.util.env.type === 'production';
}

function nope() {
  return plugins.util.noop();
}
