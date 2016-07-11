/**
 * Generate Public gulp task
 */
import data from 'gulp-data'
import path from 'path'
import gutil from 'gulp-util'
import stylus from 'gulp-stylus'
import postcss from 'gulp-postcss'
import webpack from 'webpack'
import nunjucks from 'gulp-nunjucks-render'
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
}


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
	this.suffix = taker.env.takerSuffix
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
		.on('change', ::buildList.update)
	    
	    done && done()
	}
    }
    minorWatch(gulp) {
	return done => {
	    const { minorPath, taskName, buildList } = this.taker
	    
	    gulp.watch(minorPath, gulp.series(this.taskName + this.suffix))
	    
	    done && done()
	}
    }
    init(gulp) {
	gulp.task(this.taker.taskName, this.majorBuild(gulp))
	gulp.task(this.taker.taskName + this.suffix, this.minorBuild(gulp))
    }
}


/**
 * Export css task
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


/**
 * Export image task
 *
 * @todo project should use itself image folder.
 */
export class Imagestaker extends Undertaker {
    constructor({ instance }) {
	super()
	this.env = instance.env
	this.majorPath = `${this.env.images}/**/*.*`
	this.taskName = 'img'
    }
    majorBuild(gulp) {
	return done => {
	    return gulp.src(this.majorPath)
		.pipe(gulp.dest(`${this.env.tmp}/images`))
	}
    }
    majorWatch(gulp) {
	return done => {
	    gulp.watch(this.majorPath, this.majorBuild)
	    done && done()
	}
    }
    init(gulp) {
	gulp.task(this.taskName, this.majorBuild(gulp))
    }
}


/**
 * Export dll task
 *
 * @todo project should use itself image folder.
 */
export class Dllstaker extends Undertaker {
    constructor({ instance }) {
	super()
	this.env = instance.env
	this.vendorTaskName = 'vendor'
        this.libTaskName = 'lib'
    }
    compileJs(config, flag) {
        return done => {
	    webpack(config(this.env)).run((err, stats) => {
	        if(err) return done()
	        //console.log(stats.toString(webpackLogOptions()))
	        const { time, assets } = stats.toJson()
	        drawWebpackCollect(flag, time, assets[0].name) /* 1 */
	        done && done()
	    })
        }
    }
    vendorMajorBuild(gulp) {
        return done => {
            return this.compileJs(webpackVendorOptions, 'vendor')(done)
        }
    }
    libMajorBuild(gulp) {
        return done => {
            return this.compileJs(webpackUtilOptions, 'lib')(done)
        }
    }
    vendorMajorWatch(gulp) {
        return done => {
            const pkgPath = path.resolve('package.json')
            
            gulp.watch(pkgPath, this.vendorMajorBuild)
            done && done()
        }
    }
    libMajorWatch(gulp) {
        return done => {
            const libJsPath = path.resolve(this.env.lib, 'dll', `${this.env.ignores}*.js`)

            gulp.watch(libJsPath, this.libMajorBuild)
            done && done()
        }
    }
    init(gulp) {
        gulp.task(this.vendorTaskName, this.vendorMajorBuild(gulp))
        gulp.task(this.libTaskName, this.libMajorBuild(gulp))
    }
}
