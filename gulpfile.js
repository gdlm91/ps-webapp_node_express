var gulp = require ('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var wiredepConfig = {
        options: {
            bowerJson: require('./bower.json'),
            directory: './public/lib',
            ignorePath: '../../public'
        }
    };

    var injectConfig = {
        src: gulp.src(['./public/css/*css', './public/js/*.js'], {read: false}),
        options: {ignorePath: '/public'}
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(wiredepConfig.options))
        .pipe(inject(injectConfig.src, injectConfig.options))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
    var nodemonOptions = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(nodemonOptions)
        .on('restart', function(ev) {
            console.log('Restarting...');
        });
});