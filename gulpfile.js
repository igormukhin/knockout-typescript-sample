var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var debowerify = require('debowerify');
var tsify = require('tsify');


gulp.task('default', ['serve']);

gulp.task('serve', ['js'], function() {
    browserSync.init({
        server: {
            baseDir: ['app']
        },
        open: false
    });

    gulp.watch(['app/*.html']).on('change', browserSync.reload);
});

gulp.task('js', function() {

    //global.isWatching ? watchify : browserify;
    var bundler = browserify({
            basedir: './app/scripts',
            cache: {},
            packageCache: {},
            plugin: [watchify, tsify],
            debug: true
        })
        .add('main.ts');

    bundler.transform(debowerify);

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler
            .bundle()
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the stream gulp compatible.
            // Specify the desired output filename here.
            .pipe(source('bundle.js'))
            // Specify the output destination
            .pipe(gulp.dest('./app/js/'))
            // Reload the browser-sync
            .pipe(browserSync.stream());
    }

    return rebundle();
});

function handleErrors(err) {
    // print the error (can replace with gulp-util)
    console.log(err.toString());

    // Keep gulp from hanging on this task
    this.emit('end');
}
