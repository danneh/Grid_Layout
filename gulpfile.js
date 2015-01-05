// Basic Gulp File
//
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    autoprefix = require('gulp-autoprefixer')
    notify = require("gulp-notify")
    bower = require('gulp-bower');

var config = {
	assetsPath : './assets',
    sassPath: './src/scss',
    bowerDir: './bower_components'
}

// gulp.task('bower', function() {
//     return bower()
//         .pipe(gulp.dest(config.bowerDir))
// });

// gulp.task('icons', function() {
//     return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
//         .pipe(gulp.dest(config.assetsPath + '/fonts'));
// });

gulp.task('css', function() {
    return gulp.src(config.sassPath + '/base.scss')
        .pipe(sass({
            style: 'compressed',
            loadPath: [
                config.sassPath,
                config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                config.bowerDir + '/fontawesome/scss',
                config.bowerDir + '/flexnav/sass',
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        // .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest(config.assetsPath + '/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['css', 'watch']);