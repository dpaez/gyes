/** The gulp **/
var gulp = require('gulp');

/** gulp plugins **/
var jsdoc = require("gulp-jsdoc");

/** paths **/
var paths = {
  SRC: './lib/**/*.js',
  DOCSDEST: './docs'
}

var infos = {
  name: 'Gyes'
}


var generatorTpl = {
  path                  : 'ink-docstrap',
  systemName            : 'Gyes',
  copyright             : '2014 | Diego Paez',
  navType               : 'inline',
  theme                 : 'cerulean',
  outputSourceFiles     : false,
  outputSourcePath      : true,
  dateFormat            : 'DD - MMM - YYYY',
  highlightTutorialCode : true,
  syntaxTheme           : 'dark'
}

/** gulp tasks **/
gulp.task('docs', function(){
  gulp.src( [paths.SRC, 'README.md'] )
  .pipe( jsdoc.parser({}, 'Gyes') )
  .pipe( jsdoc.generator(paths.DOCSDEST, generatorTpl ) )
});


// gulp
// gulp.task( 'default', [] );