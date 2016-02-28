var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var os = require('os');
var extend = require('extend');
var parallel = require('concurrent-transform');

var JS_DIR = '_site/assets/js';
var CSS_DIR = '_site/assets/css';
var IMG_DIR = '_site/assets/img';
var TEMPLATE_ASSETS_DIR = '_includes/assets';

gulp.task('theme.js', function() {
  return buildCustomJs({
    source: ['_assets/js/theme.js'],
    filename: 'theme.min.js',
  });
});

gulp.task('loadCSS.js', function() {
  return buildTemplateJs({
    source: ['node_modules/fg-loadcss/src/loadCSS.js'],
    filename: 'load-css.min.js',
  });
});

gulp.task('disqus.js', function() {
  return buildTemplateJs({
    source: ['_assets/js/disqus.js'],
    filename: 'disqus.min.js',
  });
});

gulp.task('ga.js', function() {
  return buildTemplateJs({
    source: ['_assets/js/google-analytics.js'],
    filename: 'google-analytics.min.js',
  });
});

gulp.task('theme.css', function() {
  return buildCustomCss({
    source: [
      'node_modules/normalize.css/normalize.css',
      '_assets/less/theme/theme.less',
    ],
    filename: 'theme.min.css',
  });
});

gulp.task('critical.css', function() {
  return buildTemplateCss({
    source: ['_assets/less/critical/critical.less'],
    filename: 'critical.min.css',
  });
});

gulp.task('featured.img', function() {
  return buildImages({
    source: ['_assets/img/**/*-cover.jpg'],
    maxWidth: 1800,
    maxHeight: 450,
    quality: 0.6,
    suffix: '-hero',
  });
});

gulp.task('hires.featured.img', function() {
  return buildImages({
    source: ['_assets/img/**/*-cover-hires.jpg'],
    maxWidth: 1800,
    maxHeight: 600,
    quality: 0.8,
    suffix: '-hero',
  });
});

gulp.task('post.img', function() {
  return buildImages({
    source: ['_assets/img/**/*.jpg'],
    maxWidth: 1200,
    maxHeight: 700,
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

function buildCustomJs(options) {
  extend(options, {
    destination: JS_DIR,
    validate: true,
    sourcemaps: true,
  });

  return buildJs(options);
}

function buildTemplateJs(options) {
  extend(options, {
    destination: TEMPLATE_ASSETS_DIR,
    validate: false,
    sourcemaps: false,
  });

  return buildJs(options);
}

function buildCustomCss(options) {
  extend(options, {
    destination: CSS_DIR,
    sourcemaps: true,
  });

  return buildCss(options);
}

function buildTemplateCss(options) {
  extend(options, {
    destination: TEMPLATE_ASSETS_DIR,
    sourcemaps: false,
  });

  return buildCss(options);
}

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
    .pipe(plugins.changed(IMG_DIR))
    .pipe(parallel(
      plugins.imageResize({
        width : options.maxWidth,
        height: options.maxHeight,
        crop: true,
        upscale : false,
        quality: options.quality,
      }), cpuCores()))
    .pipe(options.suffix ? addSuffix(options.suffix) : nope())
    .pipe(plugins.imagemin({ progressive: true }))
    .pipe(gulp.dest(IMG_DIR));
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

function addSuffix(suffix) {
  return plugins.rename(function(path) {
    path.basename += suffix;
  });
}

function cpuCores() {
  return os.cpus().length;
}

function nope() {
  return plugins.util.noop();
}
