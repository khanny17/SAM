'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var series = require('stream-series');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');


// --- Paths ---

var paths = {
    

    jshintPaths: ['public/js/**/*.js'],

};

var sources = {

    appjs: 'public/js/app.js',
    angularFiles:  ['public/js/**/*'],
    nodeFiles:  ['app/**/*'],
    index: 'public/index.html',
    injectedJs:  ['public/js/**/*.js', '!public/js/app.js'],
    libs: 'public/libs/**/*',
    sass: 'public/sass/**/*.scss',
    server: 'server.js',
    views: 'public/views/**/*'

};

var dest = {

    css: 'dist/public/css',
    dist: 'dist/',
    angularFiles: 'dist/public/js',
    nodeFiles: 'dist/app',
    libs: 'dist/public/libs',
    public: 'dist/public',
    views: 'dist/public/views'

};

// -------------



// --- Testing, Linting, Etc ---

//Run jshint on our javascript files
gulp.task('jshint', function(){
    return gulp.src(paths.jshintPaths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// -----------------------------



// --- Move Tasks ---

gulp.task('libs', function(){
    return gulp.src(sources.libs)
    .pipe(gulp.dest(dest.libs));
});

gulp.task('views', function(){
    return gulp.src(sources.views)
    .pipe(gulp.dest(dest.views));
});

gulp.task('server', function(){
    return gulp.src(sources.server)
    .pipe(gulp.dest(dest.dist));
});

gulp.task('angularFiles', function(){
    return gulp.src(sources.angularFiles)
    .pipe(gulp.dest(dest.angularFiles));
});

gulp.task('nodeFiles', function(){
    return gulp.src(sources.nodeFiles)
        .pipe(gulp.dest(dest.nodeFiles));
});

gulp.task('move', ['libs', 'views', 'server', 'angularFiles', 'nodeFiles']);

// ------------------



// --- Compilation Tasks ---

//Set up index.html, injecting required js files
gulp.task('index', function(){
    return gulp.src(sources.index)
    .pipe(inject(series(gulp.src(sources.injectedJs, {read:false}), gulp.src(sources.appjs, {read:false}) ), {relative:true}))
    .pipe(gulp.dest(dest.public))
});

gulp.task('sass', function(){
    return gulp.src(sources.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest.css));
});

gulp.task('compile', ['index', 'sass']);

// -------------------------


gulp.task('build', ['compile', 'move']);


gulp.task('clean', function(){
    return gulp.src(dest.dist)
    .pipe(clean());
});

gulp.task('default', ['jshint', 'build']);


gulp.task('watch', function() {
    gulp.watch(sources.sass, ['sass']);

    gulp.watch(sources.server, ['server']); 

    gulp.watch(sources.angularFiles, ['angularFiles']);
});

gulp.task('dev', ['watch'], function(){
    nodemon({
        script: 'dist/server.js'
    });
    
});
