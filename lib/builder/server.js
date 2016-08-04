/**
 * Server setting.
 *
 * 1. Package javascript.
 * 2. API mock server.
 * 3. Sync browsers.
 */
import path from 'path'
import glob from 'glob'
import cors from 'cors'
import gutil from 'gulp-util'
import busboy from 'connect-busboy'
import express from 'express'
import morgan  from 'morgan'
import webpack from 'webpack'
import HappyPack from 'happypack'
import bodyParser from 'body-parser'
import compression from 'compression'
import browserSync from 'browser-sync'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import {
  webpackDevOptions,
  webpackServerOptions,
  browserServerOption,
  webpackHMROptions
} from './config'
import {
  fmtError,
  drawWebpackCollect
} from './log'


/**
 * useMiddlewaves
 *
 * Call `app.use()` with a middlewave array.
 *
 * @private
 */
const useMiddlewaves = app => (...fn) => {
  fn.forEach(n => app.use(n))
  return app
}


/**
 * jsServer
 *
 * Webpack middleware.
 *
 * @private
 */
const jsServer = ({ env }) => app => {
  let complier  = webpack(webpackDevOptions(env))
  let devServer = webpackDevMiddleware(complier, webpackServerOptions())
  let hotServer = webpackHotMiddleware(complier, webpackHMROptions())

  return useMiddlewaves(app)(
	  devServer,
	  hotServer
  )
}


/**
 * apiServer
 *
 * API server.
 *
 * @private
 */
const apiServer = _ => app => {

  const router = express.Router()

  glob.sync('src/**/api.js').forEach(n => {
    let filepath = path.resolve(n)
    delete require.cache[require.resolve(filepath)]
    require(filepath)["default"](router)
  })


  useMiddlewaves(app)(
	  cors(),
	  compression(),
    busboy(),
	  bodyParser.urlencoded({ extended: false }),
	  bodyParser.json(),
	  morgan('dev')
  )

  app.use('/api', router)

  /*
  let lsRouter = app._router.stack.find(x => x.name === 'router')
      .handle.stack.map(x => {
        let { path, methods } = x.route
        return [ path, Object.keys(methods)[0] ]
      })
      console.log(lsRouter)
  */


  return app
}


/**
 * browserServer
 *
 * Browser sync.
 *
 * @private
 */
const browserServer = ({ env, browser }) => app => {

  browser.init(
	  browserServerOption({ env: env, app: app }),
	  _ => socketCall(env, browser.sockets)
  )

  return app
}


/**
 * Socket.io
 */
const socketCall = (env, io) => {
  io.on('connection', socket => {
    /*
	  socket.on('test', console.log)

    env.evt.on('PostLocateErrorToSocket', queries => {
      console.log(queries)
      socket.emit('LocateError', queries)
    })
    */

  })
}


/**
 * Main
 */
export default instance => _ => {
  return new Promise(
    (res, rej) => {
      Promise.resolve(express())
	      .then(jsServer(instance))
	      .then(apiServer(instance))
	      .then(browserServer(instance))
        .catch(rej)
        .then(res)
    }
  )
}
