var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var to5 = require("gulp-6to5");
var concat = require("gulp-concat");
var watch = require("gulp-watch");

gulp.task("default", function () {
  return gulp.src("src/**/*.es6")
    .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
    gulp.watch('src/**/*.es6', function(){gulp.run('default')});
});