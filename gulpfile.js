var gulp        = require('gulp');
var sass        = require('gulp-sass');
var webpack     = require('webpack-stream');
var html        = require('gulp-nunjucks-render');
var data        = require('gulp-data');
var imagemin    = require('gulp-imagemin');
var gulpif      = require('gulp-if');
var ismac       = /^darwin/.test(require('os').platform());
var browsersync = require('browser-sync').create();

gulp.task('webpack', () => {
    gulp.src('./dev/js/*.js')
        .pipe(webpack( require('./webpack.config.js') )).addListener
        .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', ()=> {
    return gulp.src('./dev/scss/*.scss')
        .pipe(sass({
            outputStyle : 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browsersync.stream());
});

gulp.task('html', ()=> {
    return gulp.src('./dev/html/*.html')
        .pipe(data(()=> {
            return require('./dev/data/site.json')
        }))
        .pipe(data(()=> {
            return require('./dev/data/page-a.json')
        }))
        .pipe(data(()=> {
            return require('./dev/data/page-b.json')
        }))
        .pipe(html({
            path: ['./dev/html']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('image', ()=> {
    return gulp.src(['./dev/assets/img/**', './dev/assets/svg/bg-images/*.svg'])
        .pipe(gulpif(ismac, imagemin()))
        .pipe(gulp.dest('./build/assets/img'));
});

gulp.task('svg', ()=> {
    return gulp.src('./dev/assets/svg/**/*.svg')
        .pipe(gulpif(ismac, imagemin()))
        .pipe(gulp.dest('./dev/html/svg'));
});

gulp.task('fonts', ()=> {
    return gulp.src('./dev/assets/fonts/**/**')
        .pipe(gulp.dest('./build/assets/fonts'));
});

gulp.task('video', ()=> {
    return gulp.src('./dev/assets/video/**')
        .pipe(gulp.dest('./build/assets/video'));
});

gulp.task('serve', ['sass', 'webpack', 'html', 'image', 'svg', 'video'], ()=> {
    browsersync.init({
        server: './build'
    });

    gulp.watch(['./dev/js/*.js', './dev/js/**/*.js'], ['webpack']);
    gulp.watch(['./dev/scss/*.scss', './dev/scss/**/*.scss'], ['sass']);
    gulp.watch(['./dev/html/*.html', './dev/html/**/*.html'], ['html']);
    gulp.watch(['./dev/assets/img/**'], ['image']);
    gulp.watch(['./dev/assets/svg/**/*.svg'], ['svg']);
    gulp.watch('./build/index.html').on('change', browsersync.reload);
});

gulp.task('default', ['serve']);