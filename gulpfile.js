'use strict'

var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    rigger= require('gulp-rigger'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img',
        fonts: 'build/fonts/',
        data: 'build/data',
        libs: 'build/libs'
    },
    src: {
        html: 'app/*.html',
        js: 'app/js/main.js',
        style: 'app/less/style.less',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*',
        data: 'app/data/*.json',
        libs: 'app/libs/libs.js'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/less/**/*.less',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: './build'
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: 'Youtube_App'
};

gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function(){
  return browserify(path.src.js)
    .transform(reactify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('app/js/'))
    //.pipe(rigger())
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('libs:build', function () {
  gulp.src(path.src.libs)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.libs))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function(){
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('data:build', function () {
  gulp.src(path.src.data)
    .pipe(gulp.dest(path.build.data))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'data:build',
    'fonts:build',
    'libs:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb){
        gulp.start('html:build');
    });
    watch([path.watch.js], function(event, cb){
        gulp.start('js:build');
    });
    watch([path.watch.style], function(event, cb){
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
    });
});

gulp.task('webserver', function(){
    browserSync(config);
});

gulp.task('clean', function(cb) {
  del(['build/**'], cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);




