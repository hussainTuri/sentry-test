const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const buffer      = require("vinyl-buffer")

// To prevent rewriting the source and build folder locations
const paths = {
  source: './src',
  build: './dist'
};

// Let's write our task in a function to keep things clean
function javascriptBuild() {
  return (
    browserify({
      entries: [`${paths.source}/js/sentry.js`],
      // Pass babelify as a transform and set its preset to @babel/preset-env
      transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
    })
      // Bundle it all up!
      .bundle()
      // Source the bundle
      .pipe(source('bundle.js'))

      // Build sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('./'))

      // Then write the resulting files to a folder
      .pipe(gulp.dest(`${paths.build}/scripts`))
  );
  // Start by calling browserify with our entry pointing to our main javascript file
}

function cssBuild() {
  return gulp
    .src(`${paths.source}/styles/**/*.css`)
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(`${paths.build}/styles`));
}

function cleanup() {
  // Simply execute del with the build folder path
  return del([paths.build]);
}

// Expose the task, this allows us to call this task
// by running `$ gulp build' in the terminal
exports.build = gulp.series(cleanup, javascriptBuild);
