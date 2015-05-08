
var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var server = require('gulp-express');
var fs = require('fs');
var JsonObj=JSON.parse(fs.readFileSync('./package.json'));
var version = JsonObj.version;

gulp.task('lint', function() {
    gulp.src('./static/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
    gulp.src('./static/styles/*.css')
        // .pipe(minifyCSS())
        .pipe(gulp.dest('./build/'+version+'/css'));
});

gulp.task('scripts', function() {
    gulp.src('./static/scripts/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('./build/'+version+'/js'));
});

gulp.task('images', function(){
    gulp.src('./static/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/'+version+'/img'));
});

gulp.task('templates',function() {
    gulp.src('./template/*.html')
        .pipe(gulp.dest('./build/'+version+'/'));
});

gulp.task('clean', function(){
    return gulp.src('./build/', {read: false})
        .pipe(clean());
});

gulp.task('watch',function(){
    gulp.watch('./static/styles/*.css',['styles']);
    gulp.watch('./static/scripts/*.js',['scripts']);
    gulp.watch('./static/images/*',['images']);
    gulp.watch('./template/*',['templates']);
    
    // gulp.start('lint', 'less', 'scripts', 'images');
});

gulp.task('default',['clean'],function(){
    server.run(['app.js']);
    gulp.start('lint', 'styles', 'scripts', 'images','templates');
    gulp.start('watch');
});


