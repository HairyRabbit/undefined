/**
 * Development builder
 */

import del from 'del'
import gulp from 'gulp'
import path from 'path'
import server from './server'
import environment from './environment'
import browserSync from 'browser-sync'
import { drawGreet } from './log'
import {
    //dlls,
    Stylestaker,
    Templatestaker,
    Imagestaker,
    Dllstaker
} from './taker'
import restart from './restart'


const env = environment()

const instance = {
    env: env,
    browser: browserSync.create()
}

const styles = new Stylestaker({ instance: instance })
const templates = new Templatestaker({ instance: instance })
const images = new Imagestaker({ instance: instance })
const dlls = new Dllstaker({ instance: instance })

gulp.registry(styles)
gulp.registry(templates)
gulp.registry(images)
gulp.registry(dlls)



function stopServer(done) {
    instance.browser.exit()
    done()
}


function watch(done) {
    styles.majorWatch(gulp)()
    styles.minorWatch(gulp)()
    templates.majorWatch(gulp)()
    templates.minorWatch(gulp)()
    images.majorWatch(gulp)()
    dlls.vendorMajorWatch(gulp)()
    dlls.libMajorWatch(gulp)()
    
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

gulp.task('init', gulp.parallel(
    styles.taskName,
    templates.taskName,
    images.taskName,
    dlls.vendorTaskName,
    dlls.libTaskName
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
