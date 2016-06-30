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
import express from 'express'
import morgan  from 'morgan'
import webpack from 'webpack'
import HappyPack from 'happypack'
import bodyParser from 'body-parser'
import compression from 'compression'
import browserSync from 'browser-sync'
import { fmtError } from './log'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import {
    webpackDevOptions,
    webpackServerOptions,
    browserServerOption,
    webpackHMROptions
} from './config'


/**
 * useMiddlewaves
 * 
 * Call `app.use()` with a middlewave array.
 *
 * @private
 */
function useMiddlewaves(app, fn) {
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
const jsServer = ({ env }, app) => {
    let complier = webpack(webpackDevOptions(env))
    let devServer = webpackDevMiddleware(complier, webpackServerOptions())
    let hotServer = webpackHotMiddleware(complier, webpackHMROptions())

    return useMiddlewaves(app, [
	devServer,
	hotServer
    ])
}

/**
 * apiServer
 *
 * API server.
 * 
 * @private
 */
const apiServer = (_, app) => {

    const router = express.Router()
    // @todo auto inject router to ./api.js
    app.use('/api', router)
    
    return useMiddlewaves(app, [
	cors(),
	compression(),
	bodyParser.urlencoded({ extended: false }),
	bodyParser.json(),
	morgan('dev')
    ])
}


/**
 * browserServer
 * 
 * Browser sync.
 * 
 * @private
 */
const browserServer = ({ env, browser }, app) => {
    browser.init(
	browserServerOption({ env: env, app: app })
    )

    return app
}


/**
 * Main
 */
export default (instance) => (done) => {

    const app = express()

    jsServer(instance, app)
    apiServer(instance, app)
    browserServer(instance, app)

    done && done()
}
