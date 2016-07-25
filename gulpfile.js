var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var data = require('gulp-data');


var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var prettify = require('gulp-prettify');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now() / 1000);
var namer = require('color-namer');
var jsonfile = require('jsonfile');




//script paths
var jsFiles = [
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
			'node_modules/isotope-layout/dist/isotope.pkgd.js',
			'node_modules/isotope-packery/packery-mode.pkgd.js',
			'bower_components/jquery-hoverintent/jquery.hoverIntent.js',
			'js/theme.js'
		],
		jsDest = 'js';

//takes scripts from jsFiles variable
gulp.task('scripts', function () {
	return gulp.src(jsFiles)
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest(jsDest))
			.pipe(rename('scripts.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(jsDest));
});

var plumberErrorHandler = {
	errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

gulp.task('sass', function () {
	gulp.src('./style.scss')
			.pipe(sourcemaps.init())
			.pipe(plumber(plumberErrorHandler))
			.pipe(sass({
				precision: 8
			}))
			.pipe(autoprefixer({
				browsers: [
					"Android 2.3",
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 8",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6"
				],
				cascade: false
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./'))
			.pipe(livereload())
});

gulp.task('watch', function () {

	livereload.listen();
	gulp.watch(['./style.scss', './scss/**/*.{scss,sass}', './js/theme.js', './js/partials/**/*.js'], ['sass', 'scripts'])

});

gulp.task('watch-nunjucks', function () {

	gulp.watch(['pages/**/*.+(html|nunjucks)', 'templates/**/*.+(html|nunjucks)'], ['nunjucks'])

});


gulp.task('autoprefixer', function () {
	return gulp.src('./style.css')
			.pipe(autoprefixer({
				browsers: [
					"Android 2.3",
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 8",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6"
				],
				cascade: false
			}))
			.pipe(gulp.dest('./'));
});


gulp.task('generateiconfont', function () {
	gulp.src(['svg/icons/*.svg'])
			.pipe(iconfontCss({
				fontName: 'design',
				path: 'node_modules/gulp-iconfont-css/templates/_icons.scss',
				targetPath: '../../scss/fonts/_icons.scss',
				fontPath: 'fonts/icons/'
			}))
			.pipe(iconfont({
				fontName: 'design',
				prependUnicode: true, // recommended option
				formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
				timestamp: runTimestamp, // recommended to get consistent builds when watching files
				normalize: true
			}))
			.pipe(gulp.dest('fonts/icons/'));
});

gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
	return gulp.src('pages/**/*.+(html|nunjucks)')
			// Renders template with nunjucks
			/*.pipe(data(function() {
				return require('/data.json')
			}))*/
			.pipe(nunjucksRender({
				path: ['templates']
			}))

			.pipe(prettify({indent_size: 2}))
			// output files in app folder
			.pipe(gulp.dest(''))
});

gulp.task('namecolors', function() {
	jsonfile.readFile('data.json', function(err, obj) {
		for(var k in obj.design.colors) {
			var names = namer(obj.design.colors[k]);
			//console.log('$' + names.roygbiv[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
			//console.log('$' + names.basic[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
			//console.log('$' + names.html[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
			//console.log('$' + names.x11[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
			//console.log('$' + names.pantone[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
			console.log('$' + names.ntc[0].name.toLowerCase().replace(/ /g,"-") + ': ' + obj.design.colors[k] + ';');
		}
		console.log();

	});
});

gulp.task('default', ['sass', 'watch', 'watch-nunjucks', 'scripts', 'nunjucks']);
