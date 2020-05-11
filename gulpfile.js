//const appFolder = require('path').basename(__dirname);
const appFolder = 'app';
const srcFolder = appFolder + '/_src';
const path = {
    app: {
        html: appFolder + '/',
        css: appFolder + '/css/',
        js: appFolder + '/js/',
        img: appFolder + '/media/',
        fonts: appFolder + '/fonts/',
    },
    src: {
        html: [srcFolder + '/**/*.html', '!' + srcFolder + '/**/_*.html'],
        css: srcFolder + '/scss/main.scss',
        js: srcFolder + '/js/scripts.js',
        img: srcFolder + '/media/**/*.{jpg,jpeg,png,gif,svg,ico,webp}',
        fonts: srcFolder + '/fonts/**/*.ttf'
    },
    wath: {
        html: srcFolder + '/**/*.html',
        css: srcFolder + '/scss/**/*.scss',
        js: srcFolder + '/**/*.js',
        img: srcFolder + '/media/**/*.{jpg,jpeg,png,gif,svg,ico,webp}',
    },
    clean: [ appFolder + '/**', '!' + srcFolder + '/**']
};

let {src, dest} = require('gulp');
const gulp = require('gulp'),
      browsersync = require('browser-sync').create(),
      fildeinclude = require('gulp-file-include'),
      plumber = require('gulp-plumber'),
      scss = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      groupMedia = require('gulp-group-css-media-queries'),
      cleanCss = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify-es').default,
      imagemin = require('gulp-imagemin'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2'),
      del = require('del');



// BrowserSync
function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + appFolder
        },
        port: 3000,
        open: true, // не будет открывать новое окно
        notify: false // нотис в браузере об обновлении
    })
}


// HTML
function html() {
    return src(path.src.html)
    .pipe(fildeinclude())
    .pipe(dest(path.app.html))
    .pipe(browsersync.stream())
}

// CSS
function css() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(plumber()) // при ошибке он укажет на неё, но галп не остановится
        .pipe(
            scss({
                outputStyle: "expended"
            })
        )
        .pipe(autoprefixer('last 5 versions')) // расставляем вендорные префиксы
        .pipe(cleanCss())     // минифицируем
        .pipe(sourcemaps.write('.')) // создаём карту
        .pipe(dest(path.app.css)) // выгружаем
        .pipe(browsersync.stream())
}

// js
function js() {
    return src(path.src.js)
    .pipe(fildeinclude())
    .pipe(uglify())
    .pipe(dest(path.app.js))
    .pipe(browsersync.stream())
}




// img
function img() {
    return src(path.src.img)

    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [
            {
                removeViewBox: false
            }
        ]
    }))

    /*.pipe(imagemin())*/
    .pipe(dest(path.app.img))    
    .pipe(browsersync.stream())
}


function watchFiles() {
    gulp.watch(path.wath.html, html)
    gulp.watch(path.wath.css, css)
    gulp.watch(path.wath.js, js)
    gulp.watch(path.wath.img, img)
}

// fonts
gulp.task('fonts', function(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.app.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.app.fonts));
})
gulp.task('clean', function(){
    return del(path.clean);
})

let build = gulp.series(gulp.parallel(html, css, js, img));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.build = build;
exports.watch = watch;
exports.default = watch;

