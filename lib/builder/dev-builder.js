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
  Stylestaker,
  Templatestaker,
  Imagestaker,
  Dllstaker,
  Fontstaker
} from './taker'

/**
 * Glob env. From `./environment`
 */
const env = environment()
const instance = {
  env: env,
  browser: browserSync.create()
}


/**
 * All the task need regist to Gulp.
 */
const styles    = new Stylestaker({ instance: instance })
const templates = new Templatestaker({ instance: instance })
const images    = new Imagestaker({ instance: instance })
const dlls      = new Dllstaker({ instance: instance })
const fonts     = new Fontstaker({ instance: instance })

gulp.registry(styles)
gulp.registry(templates)
gulp.registry(images)
gulp.registry(dlls)
gulp.registry(fonts)


/**
 * Stop server. Used to restart server or tasks.
 *
 * @private
 */
function stopServer(done) {
  instance.browser.exit()
  done()
}


/**
 * Watch file change.
 *
 * 1. MajorWatch task watch the entry files change.
 * 2. MinorWatch task watch the all the files, then repackage entry file.
 * 3. Vendor dll build.
 * 4. Lib dll build.
 */
function watch(done) {
  styles.majorWatch(gulp)() /* 1 */
  styles.minorWatch(gulp)() /* 2 */
  templates.majorWatch(gulp)() /* 1 */
  templates.minorWatch(gulp)() /* 2 */
  images.majorWatch(gulp)() /* 1 */
  dlls.vendorMajorWatch(gulp)() /* 3 */
  dlls.libMajorWatch(gulp)() /* 4 */

  fonts.majorWatch(gulp)()

  // restart the server
  gulp.watch(`${env.lib}/builder/*.js`, gulp.series(
	  stopServer,
	  server(instance)
  ))

  done && done()
}

/**
 * Clean `tmp`
 *
 * @todo add deep clean tasks
 */
function clean(done) {
  return del(`${env.tmp}/*`, done)
}


/**
 * Say hello.
 */
function hello(done) {
  drawGreet()
  done && done()
}


/**
 * All tasks.
 */
gulp.task('init', gulp.parallel(
  styles.taskName,
  templates.taskName,
  images.taskName,
  dlls.vendorTaskName,
  dlls.libTaskName,
  fonts.taskName
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
