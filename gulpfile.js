let gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps')

//Задание для  SCSS
//expanded - c отступами, compressed - минифицированный
gulp.task('scss', () =>
  gulp
    .src('app/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
)

//Задание для HTML, если нет препроцессора
// gulp.task('html', () => gulp.src('app/*.html').pipe(browserSync.stream()))

//Задание для pug
//{pretty: true} не минифицирует HTML
gulp.task('pug', () =>
  gulp
    .src('app/pug/index.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.stream())
)

//Задание для JS
//в массиве нужно узазать пути ко всем используемым файлам js. В том числе из node_modules
gulp.task('js', async function () {
  await gulp
    .src([
      'app/js/_burger-menu.js',
      'app/js/_validation.js',
      'app/js/_others.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})

// gulp.task('js_libs', function () {
//   gulp
//     .src(['node_modules/file_name'])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.stream())
// })

//live-reload с помощью gulp
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  })
})

//автоматически запускать компиляцию css при изменениях в scss
gulp.task('watch', function () {
  gulp.watch('app/pug/*.pug', gulp.parallel('pug'))
  gulp.watch('app/scss/*.scss', gulp.parallel('scss'))
  gulp.watch('app/js/_*.js', gulp.parallel('js'))
})

//дефолтная задача для одновременного запуска browser-sync и watch и др
gulp.task(
  'default',
  gulp.parallel('pug', 'scss', 'js', 'browser-sync', 'watch')
)
