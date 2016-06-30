import gutil from 'gulp-util'
import { fmtError } from './log'

export default class Taker {
    constructor(opts) {
	let { gulp,
	      env,
	      extname,
	      proc,
	      procOpt,
	      preProc, postProc,
	      errHandle, browser } = Object.assign({}, opts)
	this.gulp = gulp
	this.env = env
	this.extname = extname
	this.proc = proc  || gutil.noop
	this.procOpt = procOpt || gutil.noop
	this.preProc = preProc || gutil.noop
	this.postProc = postProc || gutil.noop
	this.errHandle = errHandle || gutil.noop
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
	this.browser = browser
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
	let { gulp,
	      proc,
	      preProc, postProc,
	      procOpt,
	      majorPath,
	      errHandle,
	      extname, browser,
	      env } = this

	return gulp
	    .src(majorPath, this.entryOption())
	    .pipe(preProc())
	    .pipe(proc(procOpt).on('error', function(err) {
		fmtError(extname, err).toString()
		this.emit('end')
	    }))
	    .pipe(gulp.dest(env.tmp))
	    .pipe(browser.stream())
    }
    minorBuild(done) {
	let { gulp,
	      proc,
	      procOpt,
	      env } = this
	let entry = env.buildList.getPath()
	if(!entry) return done()
	
	return gulp
	    .src(entry, this.entryOption(false))
	    .pipe(proc(procOpt).on('error', function(err) {
		errHandle(err)
		this.emit('end')
	    }))
	    .pipe(gulp.dest(env.tmp))
    }
    majorWatch() {
	let { gulp,
	      majorPath,
	      env }  = this
	
	return gulp.watch(majorPath, gulp.series(::this.majorBuild))
	    .on('change', (path) => {
		env.buildList.update(path)
		console.log(path, env.buildList)
	    })
    }
    minorWatch() {
	let { gulp, minorPath, env } = this
	
	return gulp.watch(minorPath, gulp.series(::this.minorBuild))
	    .on('change', (path) => {
		console.log(path, env.buildList)
	    })
    }
}
