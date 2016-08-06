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

import Elm from './elm/elm.js'

/**
 * Glob env. From `./environment`
 */
const env = environment()
const instance = {
  env: env,
  browser: browserSync.create()
}


let app = Elm.Taker.worker()

gulp.task('default', done => {
  app.ports.setTaker.subscribe(data => {
    console.log(data)

    app.ports.getTaker.send("hello world")
  })

  done()
})
