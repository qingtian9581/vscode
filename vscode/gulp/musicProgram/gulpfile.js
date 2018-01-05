(function (r) {
    var gulp = require('gulp');
    var swig = require('gulp-swig');
    var frontMatter = require('gulp-front-matter');
    var scss = r("gulp-scss");
    const sourcemaps = require('gulp-sourcemaps');
    const babel = require('gulp-babel');
    const watch = require('gulp-watch');
    const concat = require('gulp-concat');

    gulp.task("scss", function () {
        
        gulp.src(
            "src/scss/*.scss")
            .pipe(scss())
            .pipe(gulp.dest("dist/css"))
    });

    gulp.task('babel',function () {
       
        gulp.src('src/es/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['env']
            }))

            .pipe(gulp.dest('dist/js'))
    });

    gulp.task('swig', function () {
        
        gulp.src('src/html/*.html')
            .pipe(swig({defaults:{cache:false}}))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('dev',['babel','scss','swig']);
    gulp.task('watch',function(){
        gulp.watch(['src/es/**/*.js'],['babel']);
        gulp.watch('src/scss/**/*.scss',['scss']);
        gulp.watch('src/html/**/*.html',['swig']);
    });
}(require));