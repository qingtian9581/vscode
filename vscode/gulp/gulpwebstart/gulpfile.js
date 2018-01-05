var gulp = require('gulp');
var swig = require('gulp-swig');
var babel = require('gulp-babel');
var scss = require("gulp-scss");

gulp.task("scss", function () {

    gulp.src(
        "src/**/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
});

gulp.task('babel', function () {

    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))

        .pipe(gulp.dest('dist/js'))
});

gulp.task('swig', function () {

    gulp.src(['src/**/*.html','!src/components/**/*.html','!./src/layout.html'])
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('default', function () {
    gulp.watch(['src/**/*.js'], ['babel']);
    gulp.watch('src/**/*.scss', ['scss']);
    gulp.watch(['src/**/*.html','!src/components/**/*.html'], ['swig']);
});

