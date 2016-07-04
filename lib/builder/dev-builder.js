/**
 * Development builder
 */

import del from 'del'
import gulp from 'gulp'
import path from 'path'
import stylus from 'gulp-stylus'
import server from './server'
import webpack from 'webpack'
import postcss from 'gulp-postcss'
import nunjucks from 'gulp-nunjucks-render'
import buildList from './buildlist'
import environment from './environment'
import browserSync from 'browser-sync'
import { drawGreet } from './log'
import Taker, { images, dlls } from './taker'
import { nunjucksOptions, stylusOptions, postcssOptions } from './config'


const env = environment(buildList())

const instance = {
    env: env,
    browser: browserSync.create()
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


const img = images({
    gulp: gulp,
    instance: instance
})

const dll = dlls({
    gulp: gulp,
    instance: instance
})


function watch(done) {
    css.majorWatch()
    css.minorWatch()
    html.majorWatch()
    html.minorWatch()
    img.majorWatch()
    dll.majorWatch()
    
    done && done()
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
	::dll.majorLibBuild,
	::dll.majorVendorBuild,
	::img.majorBuild
    ))
    
    gulp.task('server', gulp.parallel(
	watch,
	server(instance)
    ))
    
    gulp.task('default', gulp.series(
	hello,
	clean,
	'init',
	'server'
    ))
}
