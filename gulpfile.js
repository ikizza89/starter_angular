//List of necessary gulp plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create(),
    browserSyncSpa = require('browser-sync-spa'),
    historyFallback = require('connect-history-api-fallback');


browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: {
            baseDir: './',
            middleware: [
                historyFallback()
            ]
        }
    });

    livereload.listen();

    gulp.watch("./assets/scss/**/*.scss", ['sass-watch']);
    gulp.watch("./app/**/*.js", ['js-watch']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./assets/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/ngstorage/ngStorage.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'app/app.config.js',
        'app/app.states.js',
        'app/shared/**/*.js',
        'app/pages/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['serve']);
