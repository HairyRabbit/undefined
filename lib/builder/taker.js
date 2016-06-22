import gutil from 'gulp-util'

export default class Taker {
    constructor(opts) {
	let { gulp,
	      env,
	      extname,
	      proc,
	      procOpt,
	      preProc } = Object.assign({}, opts)
	this.gulp = gulp
	this.env = env
	this.extname = extname
	this.proc = proc
	this.procOpt = procOpt
	this.preProc = preProc || gutil.noop
	this.majorPath = this.env.getMajorPath(this.extname)
	this.minorPath = this.env.getMinorPath(this.extname)
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
	      preProc,
	      procOpt,
	      majorPath,
	      env } = this
	
	return gulp
	    .src(majorPath, this.entryOption())
	    .pipe(preProc())
	    .pipe(proc(procOpt))
	    .pipe(gulp.dest(env.tmp))
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
	    .pipe(proc(procOpt))
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
