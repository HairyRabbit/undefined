import gutil from 'gulp-util'
import data from 'gulp-data'
import sourcemaps from 'gulp-sourcemaps'
import { fmtError } from './log'
import Collecter from './collecter'

export default class Taker {
    constructor(opts) {
	let {
	    gulp, instance, extname,
	    proc, preProc, postProc
	} = Object.assign({}, opts)
	
	this.instance = instance
	this.gulp = gulp
	this.env = this.instance.env
	this.browser = this.instance.browser
	this.buildList = this.instance.buildList
	this.extname = extname
	this.proc = proc  || gutil.noop
	this.preProc = preProc || gutil.noop
	this.postProc = postProc || gutil.noop
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
	this.collecter = new Collecter(this.extname)
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
    majorBuild() {
	let {
	    gulp,
	    proc, postProc, preProc,
	    majorPath, extname,
	    env, collecter, browser
	} = this

	return gulp
	    .src(majorPath, this.entryOption())
	    .pipe(data(_ => ::collecter.start()))
	    .pipe(sourcemaps.init())
	    .pipe(proc().on('error', function(err) {
		fmtError(extname, err).toString()
		this.emit('end')
	    }))
	    .pipe(postProc())
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest(env.tmp))
	    .pipe(browser.stream())
	    .pipe(data(_ => ::collecter.end()))
    }
    minorBuild(done) {
	let {
	    gulp,
	    proc,
	    env, collecter
	} = this
	let entry = this.buildList.getPath()
	if(!entry) return done()
	
	return gulp
	    .src(entry, this.entryOption(false))
	    .pipe(data(_ => ::collecter.start()))
	    .pipe(proc().on('error', function(err) {
		fmtError(extname, err).toString()
		this.emit('end')
	    }))
	    .pipe(gulp.dest(env.tmp))
	    .pipe(data(_ => ::collecter.end()))
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
