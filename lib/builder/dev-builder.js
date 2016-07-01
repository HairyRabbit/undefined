import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import glob from 'glob'
import path from 'path'
import Taker from './taker'
import stylus from 'gulp-stylus'
import server from './server'
import nunjucks from 'gulp-nunjucks-render'
import environment from './environment'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import {
    webpackVendorOptions,
    webpackUtilOptions,
    webpackLogOptions,
    nunjucksOptions
} from './config'

import {
    drawGreet,
    drawCollect,
    drawWebpackCollect
} from './log'


const instance = {
    env: environment(),
    browser: browserSync.create()
}

const env = environment()
const browser = browserSync.create()


const css = new Taker({
    gulp: gulp,
    env: env,
    extname: env.cssExtname,
    proc: stylus,
    procOpt: stylusOptions(env.paths, transformComponentPathForStylus),
    postProc: browserSync.stream,
    errHandle: console.log,
    browser: browser
})

const html = new Taker({
    gulp: gulp,
    env: env,
    extname: env.htmlExtname,
    proc: nunjucks,
    procOpt: nunjucksOptions(env),
    errHandle: console.log,
    browser: browser
})

const serve = new Taker({
    gulp: gulp,
    env: env,
    extname: env.jsExtname,
    browser: browser
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

const compileJs = (config, flag) => (done) => {
    webpack(config(env)).run((err, stats) => {
	if(err) return done()
	//console.log(stats.toString(webpackLogOptions()))
	drawWebpackCollect(flag, stats.toJson().time)
	done()
    })
}

const makeVendorDll = compileJs(webpackVendorOptions, 'vendor')
const makeLibDll = compileJs(webpackUtilOptions, 'lib')


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
    
    const libJsPath = path.resolve(env.lib, 'dll', `${env.ignores}*.js`)
    const pkgPath = path.resolve('package.json')

    gulp.watch(libJsPath, makeLibDll)
    gulp.watch(pkgPath, makeVendorDll)

    done()
}

/**
 * clean template
 */
function clean(done) {
    return del(`${env.tmp}/*`, done)
}

class Collecter {
    constructor(flag) {
	this.flag = flag
        this.during = 0
    }
    start(done) {
        this.during = Date.now()
        done && done()
        return this
    }
    end(done) {
        drawCollect(this.flag, Date.now() - this.during)
        done && done()
        return this
    }
}

function hello(done) {
    drawGreet()
    done && done()
}

let collectCss = new Collecter('css')
let collectHtml = new Collecter('html')
let collectDll = new Collecter('dll')

const main = do {
    gulp.task('init', gulp.parallel(
        gulp.series(::collectCss.start, ::css.majorBuild, ::collectCss.end),
	gulp.series(::collectHtml.start, ::html.majorBuild, ::collectHtml.end),
	makeVendorDll,
	makeLibDll
    ))
    gulp.task('server',
	      gulp.parallel(watch,
			    server(instance)
			   ))
    gulp.task('default',
	      gulp.series(hello, clean, 'init', 'server'))
}
