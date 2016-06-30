/**
 * Server
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
 * Webpack middleware
 */
const jsServer = ({ env }, app) => {
	
    let complier = webpack(webpackDevOptions(env))
    let devServer = webpackDevMiddleware(complier, webpackServerOptions())
    let hotServer = webpackHotMiddleware(complier, webpackHMROptions())

    app.use(devServer).use(hotServer)
}

/**
 * API server
 */
const apiServer = (_, app) => {
    
    // @todo auto inject router to ./api.js
    
    [
	cors(),
	compression(),
	bodyParser.urlencoded({ extended: false }),
	bodyParser.json(),
	morgan('dev')
    ].forEach(n => app.use(n))

    app.use('/api', express.Router())
}


/**
 * Browser sync
 */
const browserServer = ({ env, browser }, app) => {
    
    browser.init(
	browserServerOption({ env: env, app: app })
    )
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
export default (instance) => (done) => {

    const app = express()

    jsServer(instance, app)
    apiServer(instance, app)
    browserServer(instance, app)

    done && done()
}
