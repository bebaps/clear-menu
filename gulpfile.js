var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass');

var options = {
  browsersync: {
    server: true,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    },
    browser: [
      'google chrome'
    ],
    reloadOnRestart: true,
    injectChanges: true
  },
  sass : {
    outputStyle : 'expanded'
  },
  autoprefixer : {
    browsers : [
      '> 1%',
      'last 2 versions'
    ]
  }
};

// Start the server
gulp.task( 'server', ['sass'], function() {
  if (!browserSync.active) {
    browserSync.init( options.browsersync )
  }

  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
} );

// Compile Sass
gulp.task( 'sass', function() {
  return gulp
    .src( 'assets/scss/**/*.scss' )
    .pipe( sourcemaps.init() )
    .pipe( sass( options.sass )
    .on( 'error', sass.logError ) )
    .pipe( autoprefixer( options.autoprefixer ) )
    .pipe( sourcemaps.write( '/' ) )
    .pipe( gulp.dest( 'assets/css' ) )
    .pipe( browserSync.stream() );
} );

gulp.task('default', ['server']);