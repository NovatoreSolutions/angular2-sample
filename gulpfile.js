var gulp = require('gulp');
var sass = require('gulp-sass');



gulp.task('stylesPortal', function() {
    gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css/'));
});

gulp.task('default',function() {
    gulp.watch('src/assets/sass/**/*.scss',['stylesPortal']);

});
