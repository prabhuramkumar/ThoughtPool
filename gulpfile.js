'use strict'

/******************************* Dependencies ********************************/

var gulp       = require('gulp'),
    plug       = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    source     = require('vinyl-source-stream'),
    brsync     = require('browser-sync'),
    reload     = brsync.reload,
    fs         = require('fs'),
    del        = require('del')

/********************************** Globals **********************************/

// Base source files directory
var srcBase = './src/'

// Base public files directory
var destBase = './public/'

// Base temporary files directory
var tmpBase = './src/tmp/'

// Source paths per extension
var src = {
  jsx  : srcBase + 'jsx/',
  less : srcBase + 'less/'
}

// Destination files per extension
var dest = {
  js  : destBase + 'js',
  css : destBase + 'css'
}

// Temporary directories for compiled files
var tmp = {
  js: tmpBase + 'js/'
}

// Main file names
var root = {
  js   : 'app.js',
  less : 'app.less'
}

/********************************* Utilities *********************************/

// Handle errors in a stream
// Doesn't work on gulp-less anymore, should be obviated by gulp 4.0
function handle (stream) {
  return stream.on('error', function (err) {
    plug.util.log(err)
    plug.util.log('\x07\x07\x07\x07\x07')
    stream.end()
  })
}

// Get all directories in a given location
function getDirectories (dir) {
  return fs.readdirSync(dir).map(function (name) {
    return dir + name
  }).filter(function (name) {
    return fs.statSync(name).isDirectory()
  })
}

// Get module directories for browserify
function getModuleDirectories() {
  return ['./node_modules', tmp.js].concat(getDirectories(tmp.js))
}

/**
* browserify / watchify utils
* Source: http://truongtx.me/2014/08/06/using-watchify-with-gulp-for-fast-browserify-build/
*/

/**
* In the `paths` option, we pass a list of our src directories, so that
* we can `require` them without relative paths. This means we must give our
* modules names that don't clash with any third party modules we use.
*/
function browserifyRefresh() {
  // Browserify init & options
  var browsing = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    /** Can use this to require all our files by name only */
    // paths: getModuleDirectories()
    /** But it's better to have some structure and require them from root dir */
    paths: ['./node_modules', tmp.js]
  })

  // Start watching stuff
  var watching = watchify(browsing)

  // Do on update event
  watching.on('update', function() {
    bundleRefresh(watching)
  })

  // Init
  watching.add(tmp.js + root.js)
  bundleRefresh(watching)
}

function bundleRefresh (watching) {
  watching.bundle()
  .pipe(source(root.js))
  .pipe(gulp.dest(dest.js))
}

/*********************************** Tasks ***********************************/

// Clean
gulp.task('clean', function() {
  return del(tmpBase)
})

// Less
gulp.task('less', function() {
  return gulp.src(src.less + root.less)
  .pipe(handle(plug.less()))
  .pipe(handle(plug.autoprefixer()))
  .pipe(gulp.dest(dest.css))
  .pipe(reload({stream: true}))
})

// JSX
gulp.task('jsx', function() {
  return gulp.src(src.jsx + '**/*.jsx')
  .pipe(handle(plug.react({harmony: true})))
  .pipe(gulp.dest(tmp.js))
})

// Browserify
gulp.task('browserify', ['jsx'], browserifyRefresh)

// Fonts
gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest(destBase + 'fonts/'))
})

// Server proxy
gulp.task('brsync', function() {
  brsync({
    proxy  : 'localhost:3000',
    port   : 3001,
    online : false
  })
})

// Watch
gulp.task('watch', function() {
  gulp.watch(src.jsx  + '**/*.jsx',  ['jsx'])
  gulp.watch(src.less + '**/*.less', ['less'])
  gulp.watch(dest.js  + '*.js',      reload)
  gulp.watch(dest.js  + '**/*.js',   reload)
})

// Default
gulp.task('default', [
  'less',        // compile .less -> .css
  'jsx',         // compile .jsx  -> .js and put them into tmp
  'browserify',  // grab files from tmp and compile a single app.js
  'fonts',       // copy fonts from libs to public folder
  'brsync',      // fire up a browsersync server proxy
  'watch'        // the big brother is always watching
])
