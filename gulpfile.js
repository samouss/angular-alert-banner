var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));
var del = require('del');
var notify = require('gulp-notify');
var pkg = require('./package.json');
var header = require('gulp-header');
var argv = require('minimist')(process.argv.slice(2));
var ngHtml2Js = require("gulp-ng-html2js");
var es = require('event-stream');

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var defaults = {

  // build dir
  build_dir : 'dist/',

  // JS default config
  partials : {
    // path source files
    source_dir : 'src/',
  },

  // JS default config
  js : {
    // path source files
    source_dir : 'src/',

    // main file for app
    dest_app_filename : 'angular-alert-banner.js',
  }

};

// JS task
function js() {
  var files = [];

  files.push(path.join(defaults.js.source_dir, '*.module.js'));
  files.push(path.join(defaults.js.source_dir, '*.js'));

  return gulp.src(files)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (!file.jshint.success) {
        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join("\n");

        return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
      }
    }))
    .pipe(concat(defaults.js.dest_app_filename))
  ;
}

// Partials task
function partials() {
  return gulp.src(path.join(defaults.partials.source_dir, '*.html'))
    .pipe(ngHtml2Js({
      moduleName: function(file) {
        return path.basename(file.path, '.template.html') + '/' + path.basename(file.path);
      }
    }))
  ;
}

// JS task - require lint
gulp.task('js', function() {
  return es.merge(js(), partials())
    .pipe(concat(defaults.js.dest_app_filename))
    .pipe(gulpif(argv.prod !== undefined, uglify()))
    .pipe(gulpif(argv.prod !== undefined, rename(function(filepath) {
      filepath.basename += '.min';
    })))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(defaults.build_dir))
  ;
});

// Serve task
gulp.task('serve', function() {

  browserSync.init({
    open: (typeof argv.browser !== 'undefined' && !argv.browser) ? false : true,
    server: {
      baseDir: './sample/',
      routes: {
        '/bower_components': 'bower_components',
        '/dist': 'dist'
      }
    }
  });

  gulp.watch(path.join(defaults.js.source_dir, '/*.*.js'), ['js']);
  gulp.watch('./sample/*.*').on('change', browserSync.reload);

});

// --------------------------------

gulp.task('default', ['js']);
