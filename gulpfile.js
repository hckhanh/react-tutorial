var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');
var exec = require('gulp-exec');

gulp.task('build_client', function () {
    return browserify({entries: './src/main.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('watch_client', ['build_client'], function () {
    gulp.watch('src/*.jsx', ['build_client']);
});

gulp.task('watch_server', function() {
    return nodemon({
        script: 'app.js',
        ext: 'js',
        ignore: ['js/'],
        env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('release_client', function() {
    return browserify({entries: './src/main.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('js'));
});

gulp.task('release_server', function (cb) {
  exec('node app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['watch_client', 'watch_server']);
gulp.task('release', ['release_client', 'release_server']);
