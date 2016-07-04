/**
 * Development builder
 */

import del from 'del'
import gulp from 'gulp'
import glob from 'glob'
import path from 'path'
import Taker from './taker'
import stylus from 'gulp-stylus'
import server from './server'
import buildList from './buildlist'
import nunjucks from 'gulp-nunjucks-render'
import environment from './environment'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import postcss from 'gulp-postcss'
import {
    webpackVendorOptions,
    webpackUtilOptions,
    webpackLogOptions,
    nunjucksOptions,
    stylusOptions,
    postcssOptions
} from './config'
import {
    drawGreet,
    drawCollect,
    drawWebpackCollect
} from './log'


const env = environment()

const instance = {
    env: env,
    browser: browserSync.create(),
    buildList: buildList()
}


const css = new Taker({
    gulp: gulp,
    extname: env.cssExtname,
    proc: _ => stylus(stylusOptions(env)),
    postProc: _ => postcss(postcssOptions()),
    instance: instance
})

const html = new Taker({
    gulp: gulp,
    extname: env.htmlExtname,
    proc: _ => nunjucks(nunjucksOptions(env)),
    instance: instance
})

const compileJs = (config, flag) => (done) => {
    webpack(config(instance.env)).run((err, stats) => {
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

function hello(done) {
    drawGreet()
    done && done()
}

const main = do {
    gulp.task('init', gulp.parallel(
	::css.majorBuild,
	::html.majorBuild,
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
