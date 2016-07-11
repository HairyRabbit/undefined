/**
 * Generate Public gulp task
 */
import data from 'gulp-data'
import gutil from 'gulp-util'
import webpack from 'webpack'
import stylus from 'gulp-stylus'
import postcss from 'gulp-postcss'
import path from 'path'
import Collecter from './collecter'
import buildList from './buildlist'
import sourcemaps from 'gulp-sourcemaps'
import Undertaker from 'undertaker-registry'
import {
    webpackVendorOptions,
    webpackUtilOptions,
    webpackLogOptions,
    nunjucksOptions,
    stylusOptions,
    postcssOptions,
} from './config'
import {
    fmtError,
    drawGreet,
    drawCollect,
    drawWebpackCollect,
} from './log'


const $x = Object.assign

//**/*.${this.fileExtname}
export default class Taker {
    constructor(opts) {
	let {
	    gulp, instance, extname,
	    proc, preProc, postProc,
	    taskType
	} = Object.assign({}, opts)
	
	this.instance = instance
	this.gulp = gulp
	// instance
	this.env = this.instance.env
	this.browser = this.instance.browser
	// file extname
	this.extname = extname
	// proc
	// @fixme preProc and postProc should be a list
	this.proc = proc  || gutil.noop
	this.preProc = preProc || gutil.noop
	this.postProc = postProc || gutil.noop

	this.taskType = taskType
	
	this.init()
    }
    init() {
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
	this.fileExtname = this.conventTaskTypeToExtname(this.taskType)
	this.taskName = this.fileExtname
	this.collecter = new Collecter(
	    this.env,
	    this.fileExtname
	)
	// build list
	this.buildList = new buildList()
    }
    conventTaskTypeToExtname(tasktype) {
	switch(tasktype) {
	case this.env.taskType.style: return 'css'
	case this.env.taskType.page:  return 'html'
	}
    }
    /*
    entryOption(isBuild = true) {
	let gulp = this.gulp
	let src = this.env.src
	let cache = isBuild ? { since: gulp.lastRun(this.extname) } : {}

	console.log(cache, this.majorBuild)
	
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
	    .pipe(browser.stream({ match: '' }))
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
	    this.gulp.src(entry, this.entryOption(false))
	)
    }
    majorWatch() {
	let { gulp, majorPath, env, buildList }  = this
	
	return gulp.watch(majorPath, gulp.series(this.extname))
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
*/
}


/*
entryOption(isBuild = true) {
	let gulp = this.gulp
	let src = this.env.src
	let cache = isBuild ? { since: gulp.lastRun(this.majorBuild) } : {}

	console.log(cache, this.majorBuild)
	
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
	    .pipe(browser.stream({ match:  }))
	    .pipe(data(f => ::collecter.end(f)))
    }
    minorBuild(done) {
	let entry = this.buildList.getPath() || this.majorPath
	console.log(entry)
	if(!entry) return done()

	return this.build(
	    this.gulp.src(entry, this.entryOption(false))
	)
    }
    majorWatch() {
	let { gulp, majorPath, env, buildList }  = this
	
	return gulp.watch(majorPath, gulp.series(this.extname))
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
*/
const entry = (taker, gulp) => src => {
    const cached = !src ? { since: gulp.lastRun(taker.taskName) } : {}
    const option = $x({}, { base: taker.env.src, allowEmpty: true }, cached)
    return gulp.src(src || taker.majorPath, option)
}

const build = (taker, gulp) => stream => {
    const {
	proc,
	postProc,
	preProc,
	collecter,
	browser,
	fileExtname
    } = taker
    
    return stream
	.pipe(data(::collecter.start))
	.pipe(sourcemaps.init())
	.pipe(proc().on('error', function(err) {
	    fmtError(taker.extname, err).toString()
	    this.emit('end')
	}))
	.pipe(postProc())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(taker.env.tmp))
	.pipe(browser.stream({ match: `**/*.${fileExtname}` }))
	.pipe(data(::collecter.end))
}

class Basetaker extends Undertaker {
    constructor(taker) {
	super()
	this.taker = taker
	this.taskName = taker.taskName
    }
    majorBuild(gulp) {
	return done => {
	    return build(this.taker, gulp)(
		entry(this.taker, gulp)()
	    )
	}
    }
    minorBuild(gulp) {
	return done => {
	    const buildPath = this.taker.buildList.getPath() || this.taker.majorPath
	    
	    console.log(buildPath)
	    
	    return build(this.taker, gulp)(
		entry(this.taker, gulp)(buildPath)
	    )
	}
    }
    majorWatch(gulp) {
	return done => {
	    const { majorPath, taskName, buildList } = this.taker
	    
	    gulp.watch(majorPath, gulp.series(taskName))
		.on('change', path => {
		    // add to build list
		    buildList.update(path)
		})
	    
	    done && done()
	}
    }
    minorWatch(gulp) {
	return done => {
	    const { minorPath, taskName, buildList } = this.taker
	    
	    gulp.watch(minorPath, gulp.series(taskName + '-lib'))
	    
	    done && done()
	}
    }
    init(gulp) {
	gulp.task(this.taker.taskName, this.majorBuild(gulp))
	gulp.task(this.taker.taskName + '-lib', this.minorBuild(gulp))
    }
}


/**
 * Export css task
 *
 */
export class Stylestaker extends Basetaker {
    constructor({ instance }) {
	super(new Taker({
	    extname: instance.env.cssExtname,
	    proc: _ => stylus(stylusOptions(instance.env)),
	    postProc: _ => postcss(postcssOptions()),
	    taskType: instance.env.taskType.style,
	    instance: instance
	}))
    }
}

/**
 * Export html task
 *
 */
export class Templatestaker extends Basetaker {
    constructor({ instance }) {
	super(new Taker({
	    extname: instance.env.htmlExtname,
	    proc: _ => nunjucks(nunjucksOptions(instance.env)),
	    taskType: instance.env.taskType.page,
	    instance: instance
	}))
    }
}



export const styles = ({ instance, gulp }) => {
    const env = instance.env
    const cssTaker = new Taker({
	gulp: gulp,
	extname: env.cssExtname,
	proc: _ => stylus(stylusOptions(env)),
	postProc: _ => postcss(postcssOptions()),
	taskType: env.taskType.style,
	instance: instance
    })

    return {
	majorBuild: ::cssTaker.majorBuild,
	majorWatch: ::cssTaker.majorWatch,
	minorWatch: ::cssTaker.minorWatch
    }
}



/**
 * Export image task
 * 
 */
export const images = ({ instance, gulp }) => {
    const env = instance.env
    const majorPath = `${env.images}/**/*.*`

    
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


/**
 * Export dll task
 *
 * 1. @fixme it's can't safey.
 */
export const dlls = ({ instance, gulp }) => {
    const env = instance.env
    const compileJs = (config, flag) => (done) => {
	webpack(config(env)).run((err, stats) => {
	    if(err) return done()
	    //console.log(stats.toString(webpackLogOptions()))
	    const { time, assets } = stats.toJson()
	    drawWebpackCollect(flag, time, assets[0].name) /* 1 */
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
