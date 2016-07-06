/**
 * Generate Public gulp task
 */
import data from 'gulp-data'
import gutil from 'gulp-util'
import webpack from 'webpack'
import path from 'path'
import Collecter from './collecter'
import buildList from './buildlist'
import sourcemaps from 'gulp-sourcemaps'
import {
    webpackVendorOptions,
    webpackUtilOptions,
    webpackLogOptions,
    nunjucksOptions,
    stylusOptions,
    postcssOptions
} from './config'
import {
    fmtError,
    drawGreet,
    drawCollect,
    drawWebpackCollect
} from './log'


export default class Taker {
    constructor(opts) {
	let {
	    gulp, instance, extname,
	    proc, preProc, postProc,
	    taskType
	} = Object.assign({}, opts)
	
	this.instance = instance
	this.gulp = gulp
	this.env = this.instance.env
	this.browser = this.instance.browser
	this.buildList = new buildList()
	this.extname = extname
	this.proc = proc  || gutil.noop
	this.preProc = preProc || gutil.noop
	this.postProc = postProc || gutil.noop
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
	this.fileExtname = this.conventTaskTypeToExtname(taskType)
	this.collecter = new Collecter(
	    this.env,
	    this.fileExtname
	)
    }
    conventTaskTypeToExtname(tasktype) {
	switch(tasktype) {
	case this.env.taskType.style: return 'css'
	case this.env.taskType.page:  return 'html'
	}
    }
    entryOption(isBuild = true) {
	let gulp = this.gulp
	let src = this.env.src
	let cache = isBuild ? { since: gulp.lastRun(this.majorBuild) } : {}
	
	return Object.assign({}, {
	    base: src,
	    allowEmpty: true
	}, cache)
    }
    build(stream) {
	let {
	    gulp, extname,
	    proc, postProc, preProc,
	    env, collecter, browser
	} = this

	return stream
	    .pipe(data(f => ::collecter.start(f)))
	    .pipe(sourcemaps.init())
	    .pipe(proc().on('error', function(err) {
		fmtError(extname, err).toString()
		this.emit('end')
	    }))
	    .pipe(postProc())
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest(env.tmp))
	    .pipe(browser.stream({ match: `**/*.${this.fileExtname}` }))
	    .pipe(data(f => ::collecter.end(f)))
    }
    majorBuild() {
	return this.build(
	    this.gulp.src(this.majorPath, this.entryOption())
	)
    }
    minorBuild(done) {
	let entry = this.buildList.getPath() || this.majorPath
	console.log(entry)
	if(!entry) return done()

	return this.build(
	    this.gulp.src(/*this.majorPath*/entry, this.entryOption(false))
	)
    }
    majorWatch() {
	let { gulp, majorPath, env, buildList }  = this
	
	return gulp.watch(majorPath, gulp.series(::this.majorBuild))
	    .on('change', (path) => {
		buildList.update(path)
		console.log(path, buildList)
	    })
    }
    minorWatch() {
	let { gulp, minorPath, env, buildList } = this

	return gulp.watch(minorPath, gulp.series(::this.minorBuild))
	    .on('change', (path) => {
		console.log(path, buildList)
	    })
    }
}


export const images = ({ instance, gulp }) => {
    let env = instance.env
    let majorPath = `${env.images}/**/*.*`

    
    function build() {
	return gulp.src(majorPath)
	    .pipe(gulp.dest(`${env.tmp}/images`))
    }

    function watch() {
	return gulp.watch(majorPath, build)
    }
    
    return {
	majorBuild: build,
	majorWatch: watch
    }
}


export const dlls = ({ instance, gulp }) => {
    const env = instance.env
    const compileJs = (config, flag) => (done) => {
	webpack(config(env)).run((err, stats) => {
	    if(err) return done()
	    //console.log(stats.toString(webpackLogOptions()))
	    drawWebpackCollect(flag, stats.toJson().time)
	    done && done()
	})
    }
    const makeVendorDll = compileJs(webpackVendorOptions, 'vendor')
    const makeLibDll = compileJs(webpackUtilOptions, 'lib')
    const libJsPath = path.resolve(env.lib, 'dll', `${env.ignores}*.js`)
    const pkgPath = path.resolve('package.json')

    function watch() {
	gulp.watch(libJsPath, makeLibDll)
	gulp.watch(pkgPath, makeVendorDll)
    }

    return {
	majorLibBuild: makeLibDll,
	majorVendorBuild: makeVendorDll,
	majorWatch: watch
    }
}
