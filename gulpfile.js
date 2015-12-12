var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var debowerify = require('debowerify');


gulp.task('default', ['serve']);

gulp.task('serve', ['js'], function() {
    browserSync.init({
        server: {
            baseDir: ['app', '.tmp', 'bower_components'],
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        open: false
    });

    gulp.watch(['app/*.html']).on('change', browserSync.reload);
});

gulp.task('js', function() {

    //global.isWatching ? watchify : browserify;
    var bundler = browserify('./app/scripts/main', {
        cache: {},
        packageCache: {},
        plugin: [watchify],
        debug: true
    });

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
            .pipe(gulp.dest('./.tmp/js/'))
            // Reload the browser-sync
            .pipe(browserSync.stream());
    }

    return rebundle();
});

function handleErrors(err) {
    // print the error (can replace with gulp-util)
    console.log(err);

    // Keep gulp from hanging on this task
    this.emit('end');
}
