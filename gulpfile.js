
let fileswatch   = 'html,htm,txt,json,md,woff2'; // список расширений для отслеживания и перезагрузке при изменении
let imageswatch  = 'jpg,jpeg,png,webp,svg'; // List of images extensions for watching & compression (comma separated)
const   gulp = require('gulp'),
        rigger = require('gulp-rigger'),
        //autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        browsersync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),
        imagemin     = require('gulp-imagemin'),
        newer        = require('gulp-newer'),
        del          = require('del'),

      path = {
        src: 'app',
        dev: 'src',
        scss: 'scss',
        parts: 'template-parts',
        js: 'js',
        css: 'css'
      },

      files = {
        html: `${path.src}/${path.dev}/**/*.html`,
        css:  `${path.src}/${path.css}/**/*.css`,
        scss: `${path.src}/${path.dev}/${path.scss}/**/*.scss`,
        js:   `${path.src}/${path.dev}/${path.js}/**/*.js`
      };   



// BrowserSync
function browserSync(done) {
  browsersync.init({
      server: {
          baseDir: `${path.src}`
      },
      port: 3000
  })

  done()
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload()

  done()
}


// Images
function images() {
  return gulp.src(`app/src/img/**/*`)
	  .pipe(newer('app/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
}
function cleanimg() {
  return del('app/img/**/*', { force: true })
} 

// CSS task
function cssGenerate() {
  return gulp
      .src(`${path.src}/${path.dev}/${path.scss}/**/*.scss`)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // nested/expanded
      //.pipe(autoprefixer('last 2 versions'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/css'))
      .pipe(browsersync.stream())
}

// HTML task
function htmlGenerate() {
  return gulp.src(`${path.src}/${path.dev}/**/*.html`)
      .pipe(rigger())
      .pipe(gulp.dest(`${path.src}`))
      .pipe(browsersync.stream())
}



// Scripts & JS Libraries

function scripts() {

  

  return gulp.src(`${path.src}/${path.dev}/**/*.js`)
      .pipe(rigger())
      .pipe(gulp.dest('app'))
      .pipe(browsersync.stream())  
}


function watchFiles() {
  gulp.watch(files.scss, cssGenerate)
  gulp.watch(files.html, htmlGenerate)
  gulp.watch(files.js, scripts)
  gulp.watch(['app/**/*.{' + imageswatch + '}'], images)
}




const watch = gulp.parallel(watchFiles, browserSync);

exports.js = scripts;
exports.css = cssGenerate;
exports.html = htmlGenerate;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.default = gulp.series(images, scripts, htmlGenerate, cssGenerate, watch)



