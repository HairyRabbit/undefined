/**
 * Server
 *
 * @todo update webpack to 2.0
 * @todo need send event
 * @todo errors
 * @todo ddl supports
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
    browserServerOption
} from './config'



/**
 * API server
 */
function apiServer(app) {
    return function() {
        const router = express.Router()

        app.use(cors())
            .use(compression())
            .use(bodyParser.urlencoded({ extended: false }))
            .use(bodyParser.json())
            .use(morgan('dev'))
            .use('/api', router)
    }
}

/**
 * Browser sync
 *
 * 1. use express middleware
 */
function browserServer(env, app) {
    const browser = browserSync.create()
    const port = 8888

    return function() {
        browser.init(browserServerOption({ env: env, app: app }))
    }
}

class webpackCompileFailPlugin {
    //if(err) return fmtError('js', err)
    //console.log(err)
    //console.log(stats)
    //return stats.toString()
    apply(compiler) {
	      compiler.plugin('done', function(stats) {
	          let errs = stats.toJson().errors
	          if(errs.length) fmtError('js', errs)
	      })
    }
}

/**
 * Webpack middleware
 */
function javascriptServer(env, app, js) {
    return function() {
        let complier = webpack(webpackDevOptions(js))
	      let devServer = webpackDevMiddleware(complier, webpackServerOptions())
	      let hotServer = webpackHotMiddleware(complier)

        app.use(devServer)
	      app.use(hotServer)
    }
}

/**
 * Throw errors
 */
function throwErr(gulp, flag) {
    return function(err) {
        gulp.emit('error', new gutil.PluginError(flag, err))
    }
}

/**
 * Main
 */
export default function (js) {
    return function server() {

        const { env, gulp, majorPath }  = js

        const app = express()

        Promise.resolve()
            .then(javascriptServer(env, app, js))
            .catch(throwErr(gulp, 'javaScript-server'))
            .then(apiServer(app))
            .catch(throwErr(gulp, 'api-Server'))
            .then(browserServer(env, app))
            .catch(throwErr(gulp, 'browser-server'))
    }
}
