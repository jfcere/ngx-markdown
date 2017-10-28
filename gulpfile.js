const CleanCSS = require('clean-css');
const gulp = require('gulp');
const htmlMinifier = require('html-minifier');
const inlineNg2Template = require('gulp-inline-ng2-template');
const sass = require('node-sass');

function sassProcessor(path, ext, file, callback) {
  if (ext[0] === '.scss') {
    const sassObj = sass.renderSync({ file: path });
    if (sassObj && sassObj['css']) {
      file = new CleanCSS({})
        .minify(sassObj.css.toString('utf8'))
        .styles;
    }
  }
  return callback(null, file);
};

function minifyTemplate(path, ext, file, callback) {
  const minifiedFile = htmlMinifier.minify(file, {
    caseSensitive: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
  });

  callback(null, minifiedFile);
}

gulp.task('inline-template', function () {
  return gulp.src(['./src/app/markdown/*.ts', '!./src/app/markdown/*.spec.ts'])
    .pipe(inlineNg2Template({
      base: '/src/app/markdown',
      removeLineBreaks: true,
      styleProcessor: sassProcessor,
      templateProcessor: minifyTemplate,
      useRelativePaths: true,
    }))
    .pipe(gulp.dest('./inline-template'));
});
