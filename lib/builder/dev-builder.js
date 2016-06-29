import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import path from 'path'
import Taker from './taker'
import stylus from 'gulp-stylus'
import server from './server'
import nunjucks from 'gulp-nunjucks-render'
import environment from './environment'
import webpack from 'webpack'
import {
    webpackVendorOptions,
    webpackUtilOptions,
    webpackLogOptions,
    nunjucksOptions
} from './config'

const env = environment()

const css = new Taker({
    gulp: gulp,
    env: env,
    extname: env.cssExtname,
    proc: stylus,
    procOpt: stylusOptions(env.paths, transformComponentPathForStylus),
    errHandle: console.log,
})

const html = new Taker({
    gulp: gulp,
    env: env,
    extname: env.htmlExtname,
    proc: nunjucks,
    procOpt: nunjucksOptions(env),
})

const serve = new Taker({
    gulp: gulp,
    env: env,
    extname: env.jsExtname,
})

function transformComponentPathForStylus(render) {
    render.str = render.str.replace(/[\"|\']@(\w+)[\"|\']/, '\"$1/index\"')
}

function stylusOptions(paths, ...transforms) {
    return {
	include: paths,
	use: transforms
    }
}


function makeVendorDll(done) {
    let compiler = webpack(webpackVendorOptions(env))
    compiler.run((err, stats) => {
	if(err) return
	console.log(stats.toString(webpackLogOptions()))
	done()
    })
}

const waitFor = (opts) => (predicate) => {
    let timer = null
    let count = 0
    let now = Date.now()
    
    const defaultOptions = {
	interval: 1000,
	times: 0,
	timeout: 5000
    }
    let { interval, times, timeout } = Object.assign({}, defaultOptions, opts)

    return new Promise((res, rej) => {
	timer = setInterval(_ => {
	    if(predicate()) {
		clearInterval(timer)
		return res()
	    }

	    if(times > 0 && count >= times) {
		clearInterval(timer)
		return rej()
	    }

	    if(times === 0 && timeout && Date.now() - now >= timeout) {
		clearInterval(timer)
		return rej()
	    }

	    count = count + 1
	}, interval)
    })
}

function makeLibInitDll(done) {
    let compiler = webpack(webpackUtilOptions(env))
    compiler.run((err, stats) => {
	if(err) return
	console.log(stats.toString(true))
	done()
    })
}

function makeLibDll(done) {
    let compiler = webpack(webpackUtilOptions(env))
    compiler.watch({
	
    }, (err, stats) => {
	if(err) {
	    return
	}
	console.log(stats.toString(true))
	done()
    })
}

function getDeps() {
    return Object.keys(require(path.resolve('package.json')).dependencies)
}

function watch(done) {
    css.majorWatch()
    css.minorWatch()
    html.majorWatch()
    html.minorWatch()
    // @todo add logger
    
    /*
    gulp.watch([js.majorPath, js.minorPath])
	.on('change', function(file, stat) {
	    console.log(file)
	})
    */
    gulp.watch(path.resolve('package.json'),
	       gulp.series(makeVendorDll))
    
    done()
}

/**
 * clean template
 */
function clean(done) {
    return del(`${env.tmp}/*`, done)
}

const main = do {
    gulp.task('init',
	      gulp.parallel(::css.majorBuild,
			    ::html.majorBuild,
			    makeVendorDll,
			    makeLibInitDll))
    gulp.task('server',
	      gulp.parallel(watch,
			    makeLibDll,
			    server(serve)
			   ))
    gulp.task('default',
	      gulp.series(clean, 'init', 'server'))
    
    gulp.on('stop', function(evt) {
	let { name, duration } = evt
    })
}
