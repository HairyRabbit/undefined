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
import environment from './environment'
import browserSync from 'browser-sync'
import { drawGreet } from './log'
import { images, dlls, Stylestaker, Templatestaker } from './taker'
import restart from './restart'
import { nunjucksOptions, stylusOptions, postcssOptions } from './config'


const env = environment()

const instance = {
    env: env,
    browser: browserSync.create()
}

/*
const css = new Taker({
    gulp: gulp,
    extname: env.cssExtname,
    proc: _ => stylus(stylusOptions(env)),
    postProc: _ => postcss(postcssOptions()),
    taskType: env.taskType.style,
    instance: instance
})


const html = new Taker({
    gulp: gulp,
    extname: env.htmlExtname,
    proc: _ => nunjucks(nunjucksOptions(env)),
    taskType: env.taskType.page,
    instance: instance
})

const css = styles({
    gulp: gulp,
    instance: instance
})
*/

const styles = new Stylestaker({ instance: instance })
//const templates = new Templatestaker({ instance: instance })
gulp.registry(styles)
//gulp.registry(templates)

const img = images({
    gulp: gulp,
    instance: instance
})

const dll = dlls({
    gulp: gulp,
    instance: instance
})


function stopServer(done) {
    instance.browser.exit()
    done()
}


function watch(done) {
    styles.majorWatch(gulp)()
    styles.minorWatch(gulp)()
    //css.majorWatch()
    //css.minorWatch()
    //html.majorWatch()
    //html.minorWatch()
    img.majorWatch()
    dll.majorWatch()
    
    //gulp.watch(`${env.lib}/builder/*.js`, gulp.series(stopServer, restart))
    
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



//gulp.task(env.cssExtname, css.majorBuild)

gulp.task('init', gulp.parallel(
    styles.taker.taskName,
    //templates.taker.taskName,
    //env.htmlExtname,
    //::html.majorBuild,
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
    'server',
))
