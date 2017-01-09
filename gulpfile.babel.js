'use strict';

const OPTIONS = {
  autoprefixer: {
    browsers: ['> 1%', 'last 3 versions', 'Safari > 7', 'IE > 10']
  },
  browsersync: {
    server: true,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
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

  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./*.html').on('change', BROWSERSYNC.reload);
});

// Sass/CSS
// -----------------------------------------------------------------------------
// Delete compiled CSS
gulp.task('clean:css', () => {
  del('./dist/css');
});

// Lint Sass/CSS
gulp.task('lint:sass', () => {
  return gulp
    .src('./src/scss/*.scss')
    .pipe($.stylelint(OPTIONS.stylelint));
});

// Compile Sass to CSS, and create a sourcemap
gulp.task('sass', ['clean:css'], () => {
  return gulp
    .src('./src/scss/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass(OPTIONS.sass)
      .on('error', $.sass.logError))
    .on('error', $.notify.onError('Error compiling Sass!'))
    .pipe($.autoprefixer(OPTIONS.autoprefixer))
    .pipe($.sourcemaps.write('/'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/css'))
    .pipe(BROWSERSYNC.stream());
});

// Optimize the compiled CSS via CSSNano
gulp.task('sass:minify', ['sass'], () => {
  return gulp
    .src('./dist/css/*.css')
    .pipe($.plumber())
    .pipe($.cssnano(OPTIONS.cssnano))
    .pipe($.rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(BROWSERSYNC.stream());
});

// JS
// -----------------------------------------------------------------------------
// Delete the generated project JS file and sourcemap(s)
gulp.task('clean:js', () => {
  del('./dist/js');
});

// Lint JavaScript via ESLint
gulp.task('js:lint', () => {
  return gulp
    .src('./src/js/*.js')
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('js', ['clean:js'], () => {
  return gulp
    .src('./src/js/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sourcemaps.write('/'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/js'));
});

// Minify the concatenated JavaScript file
gulp.task('js:minify', ['js'], () => {
  return gulp
    .src('./dist/js/*.js')
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/js'))
    .pipe(BROWSERSYNC.stream());
});

// Default
// -----------------------------------------------------------------------------
gulp.task('default', ['server']);
