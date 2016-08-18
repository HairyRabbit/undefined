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

import RabbitStylusUtilLoader from './RabbitStylusUtilLoader.js'
import RabbitStylusDocGenerator from './RabbitStylusDocGenerator.js'


/**
 * Glob env. From `./environment`
 */
const env = environment()
const instance = {
  env: env,
  browser: browserSync.create()
}


gulp.task('default', function(done) {
  let testpath = 'f:/atlantis/src/demo-sys/rabbit.json'
  let root = 'f:/atlantis/rabbit.json'

  RabbitStylusDocGenerator()


  //console.log(isRootPath(testpath, root))
  done()
})


