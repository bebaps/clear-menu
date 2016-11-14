var gulp         = require( 'gulp' ),
    browserSync  = require( 'browser-sync' ).create(),
    autoprefixer = require( 'gulp-autoprefixer' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    postscss     = require( "postcss-scss" ),
    reporter     = require( 'postcss-reporter' ),
    cssnext      = require( 'postcss-cssnext' ),
    stylelint    = require( 'gulp-stylelint' ),
    sass         = require( 'gulp-sass' ),
    coffee       = require( 'gulp-coffee' );

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
    sass: {
        outputStyle: 'expanded'
    },
    autoprefixer: {
        browsers: [
            '> 1%',
            'last 3 versions'
        ]
    },
    stylelint: {
        reporters: [
            {
                formatter: 'string',
                console: true
            }
        ]
    },
    postcss: {
        syntax: 'scss'
    }
};

// Start the server
gulp.task( 'server', [ 'sass' ], function() {
    if ( !browserSync.active ) {
        browserSync.init( options.browsersync )
    }

    gulp.watch( './src/scss/*.scss', [ 'sass' ] );
    gulp.watch( './*.html' ).on( 'change', browserSync.reload );
} );

// Compile Sass
gulp.task( 'sass', function() {
    return gulp
        .src( './src/scss/*.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass( options.sass )
            .on( 'error', sass.logError ) )
        .pipe( autoprefixer( options.autoprefixer ) )
        .pipe( sourcemaps.write( '/' ) )
        .pipe( gulp.dest( './dist/css' ) )
        .pipe( browserSync.stream() );
} );

// Lint Sass/CSS
gulp.task( 'lint:sass', function() {
    return gulp
        .src( './src/scss/*.scss' )
        .pipe( stylelint( options.stylelint ) );
} );

// Compile CoffeeScript
gulp.task( 'js', function() {
    return gulp
        .src( './src/coffee/*.coffee' )
        .pipe( sourcemaps.init() )
        .pipe( coffee( { bare: true } ) )
        .pipe( sourcemaps.write( '/' ) )
        .pipe( gulp.dest( './dist/js' ) )
        .pipe( browserSync.stream() );
} );

gulp.task( 'default', [ 'server' ] );
