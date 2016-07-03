import gutil from 'gulp-util'
import data from 'gulp-data'
import { fmtError } from './log'
import Collecter from './collecter'

export default class Taker {
    constructor(opts) {
	let { gulp,
	      instance,
	      extname,
	      proc,
	      procOpt,
	      preProc, postProc } = Object.assign({}, opts)
	this.instance = instance
	this.gulp = gulp
	this.env = this.instance.env
	this.browser = this.instance.browser
	this.buildList = this.instance.buildList
	this.extname = extname
	this.proc = proc  || gutil.noop
	this.procOpt = procOpt || gutil.noop
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
	this.collecter = new Collecter(this.extname)
    }
    entryOption(isBuild = true) {
	let gulp = this.gulp
	let { src } = this.env
	let cache = isBuild ? { since: gulp.lastRun(this.majorBuild) } : {}
	
	return Object.assign({}, {
	    base: src,
	    allowEmpty: true
	}, cache)
    }
    majorBuild() {
	let {
	    gulp,
	    proc, procOpt,
	    majorPath, extname,
	    env, collecter, browser
	} = this

	return gulp
	    .src(majorPath, this.entryOption())
	    .pipe(data(_ => ::collecter.start()))
	    .pipe(proc(procOpt).on('error', function(err) {
		fmtError(extname, err).toString()
		this.emit('end')
	    }))
	    .pipe(gulp.dest(env.tmp))
	    .pipe(browser.stream())
	    .pipe(data(_ => ::collecter.end()))
    }
    minorBuild(done) {
	let {
	    gulp,
	    proc, procOpt,
	    env, collecter
	} = this
	let entry = this.buildList.getPath()
	if(!entry) return done()
	
	return gulp
	    .src(entry, this.entryOption(false))
	    .pipe(data(_ => ::collecter.start()))
	    .pipe(proc(procOpt).on('error', function(err) {
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
