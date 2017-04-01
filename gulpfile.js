var gulp = require('gulp');
var browserSync = require('browser-sync');
var relaod = browserSync.reload;
var sass =  require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyJS = require('gulp-minify');
var optimizeImg = require('gulp-imagemin');

var vendorPath = 'js/vendor';

// Bower Sync task for relaod server
gulp.task('browser-sync', ['sass'], function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

// Compile all scss from scss file to css and minify all to dist file
gulp.task('sass', function(){
  gulp.src('scss/style.scss')
      .pipe(sass({
        includePaths: ['css'],
        precision: 10
      }))
      .pipe(prefix(['> 1%', 'last 3 version', 'iOS 8' ]))
      .pipe(gulp.dest('css'))
      .pipe(minCss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist'))
      .pipe(relaod({stream: true}));
});

//Minify and concat vendors.js and custom.js
gulp.task('uglifyJS', function(){
  return gulp.src([
    vendorPath+'/jquery.js',
    // vendorPath+'/bootstrap.js',
    vendorPath+'/TweenMax.js',
    vendorPath+'/CSSPlugin.js',
    vendorPath+'/ScrollMagic.js',
    vendorPath+'/animation.gsap.js',
    'js/custom.js'
  ])
  .pipe(concat('script.js'))
  .pipe(uglify({mangle: false}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist'))
  .pipe(relaod({stream: true}));
});

// Compress all images
gulp.task('optImg', function(){
  gulp.src('old_img/*.{png,jpg,gif,svg}')
          .pipe(optimizeImg({
            optimizationLevel: 7,
            progressive: true
          }))
          .pipe(gulp.dest('images'));
});

// Watch for changes
gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/custom.js', ['uglifyJS']);
  gulp.watch('img/*', ['optImg'])
  gulp.watch('contact.html').on('change', relaod);
});

// Default task for run gulp in terminal
gulp.task('default' , ['browser-sync', 'uglifyJS', 'optImg', 'watch']);
