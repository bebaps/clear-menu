'use strict';

const OPTIONS = {
  autoprefixer: {
    browsers: ['> 1%', 'last 3 versions', 'Safari > 7']
  },
  browsersync: {
    server: true,
    ghostMode: {
      clicks: true
    },
    browser: ['google chrome'],
    reloadOnRestart: true,
    injectChanges: true
  },
  cssnano: {
    autoprefixer: false,
    calc: {
      mediaQueries: true
    },
    colormin: false,
    convertValues: {
      precision: 0
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    svgo: {
      encode: true
    },
    zindex: false
  },
  loadplugins: {
    lazy: true
  },
  postcss: {
    syntax: 'scss'
  },
  sass: {
    outputStyle: 'expanded'
  },
  stylelint: {
    reporters: [{
      formatter: 'string',
      console: true
    }]
  }
};

import gulp from 'gulp';
import del from 'del';
import postscss from 'postcss-scss';
import reporter from 'postcss-reporter';

const BROWSERSYNC = require('browser-sync').create();
const $ = require('gulp-load-plugins')(OPTIONS.loadplugins);

// Start a server
// -----------------------------------------------------------------------------
gulp.task('server', ['sass'], () => {
  if (!BROWSERSYNC.active) {
    BROWSERSYNC.init(OPTIONS.browsersync);
  }

  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.js', ['js']);
  gulp.watch('./*.html').on('change', BROWSERSYNC.reload);
});

// Sass/CSS
// -----------------------------------------------------------------------------
// Delete compiled CSS
gulp.task('clean:css', () => {
  del('./dist/clearmenu.min.css');
});

// Lint Sass/CSS
gulp.task('lint:sass', () => {
  return gulp
    .src('./src/*.scss')
    .pipe($.stylelint(OPTIONS.stylelint));
});

// Compile Sass to CSS, and create a sourcemap
gulp.task('sass', ['clean:css'], () => {
  return gulp
    .src('./src/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass(OPTIONS.sass)
      .on('error', $.sass.logError))
    .on('error', $.notify.onError('Error compiling Sass!'))
    .pipe($.autoprefixer(OPTIONS.autoprefixer))
    .pipe($.cssnano(OPTIONS.cssnano))
    .pipe($.rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe($.sourcemaps.write('/'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/'))
    .pipe(BROWSERSYNC.stream());
});

// JS
// -----------------------------------------------------------------------------
// Delete the generated project JS file
gulp.task('clean:js', () => {
  del('./dist/clearmenu.min.js');
});

// Lint JavaScript via ESLint
gulp.task('js:lint', () => {
  return gulp
    .src('./src/*.js')
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// Process the JavaScript and create a sourcemap
gulp.task('js', () => {
  return gulp
    .src('./src/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe($.sourcemaps.write('/'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/'))
    .pipe(BROWSERSYNC.stream());
});

// Default
// -----------------------------------------------------------------------------
gulp.task('default', ['sass', 'js', 'server']);
