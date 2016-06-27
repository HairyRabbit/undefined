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


/**
 * Webpack dll builder
 */
function webpackDllOptions(env) {
    return {
	entry: {
	    lib: [path.resolve(env.lib, 'dll', 'test')]
	},
	output: {
	    path: path.resolve(env.dll),
	    filename: '[name].js',
	    library: '[name]_[hash]'
	},
	plugins: [
	    new webpack.DllPlugin({
		path: path.join(path.resolve(env.dll), '[name]-manifest.json'),
		name: '[name]_[hash]'
	    })
	]
    }
}

/**
 * Webpack config
 *
 * 1. resolve HMR path with muilt entries
 */
function webpackOptions(env, entries) {
    let pool = HappyPack.ThreadPool({ size: 5 })
    
    return {
	entry: entries,
	output: {
	    path: path.resolve(env.tmp),
	    publicPath: '/', /* 1 */
	    filename: '[name].js'
	    //library: '[name]'
	},
	module: {
            loaders: [
                { test: /\.jsx?$/, loader: 'happypack/loader?id=js' },
                { test: /\.njk$/,  loader: 'happypack/loader?id=html' }
            ]
	},
	resolve: {
            root: env.paths.concat('./').map(n => path.resolve(n))
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin('commons'),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpackCompileFailPlugin(),
	    new webpack.DllReferencePlugin({
		context: path.resolve(env.tmp),
		manifest: require(path.resolve(env.tmp, 'lib-manifest.json'))
            }),
	    new HappyPack({
		id: 'js',
		threadPool: pool,
		loaders: ['babel']
	    }),
	    new HappyPack({
		id: 'html',
		threadPool: pool,
		loaders: ['nunjucks']
	    })
	]
    }
}

/**
 * Webpack dev server options
 */
function webpackServerOptions() {
    return {
	//noInfo: true,
	//quiet: true,
	watch: {
	    poll: true
	},
	stats: {
	    colors: true
	}
    }
}

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
        browser.init({
	    port: port,
	    ui: false,
	    //logLevel: 'silent',
	    open: false,
	    startPath: '/',
	    server: env.tmp,
	    middleware: [app] /* 1 */
	})
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

function javascriptdllBuilder(env) {
    let dllComplier = webpack(webpackDllOptions(env))
    dllComplier.run((err, stats) => {
	console.log(stats.toString())
    })
}

/**
 * Webpack middleware
 */
function javascriptServer(env, app) {
    return function(entry) {
        let config = webpackOptions(env, entry)
        let complier = webpack(config)
	let devServer = webpackDevMiddleware(complier, webpackServerOptions())
	let hotServer = webpackHotMiddleware(complier)

        app.use(devServer)
	app.use(hotServer)
    }
}

/**
 * Promise for glob
 */
function getJsFiles(str) {
    return new Promise((res, rej) => {
        glob(str, (err, files) => {
            if(err) return rej(err)
            res(files)
        })
    })
}

/**
 * Normalize file path for webpack
 */
function normalizeFiles(env, filepath) {
    const webpackHMR = `webpack-hot-middleware/client?reload=false&overlay=true`
    const dll = 'module'
    const { basename, relative, extname, resolve } = path
    
    return function(files = []) {
	if(!files.length) throw new Error(`Can't find any files from ${filepath}`)
        return Object.assign.apply(null, files.map(n => {
	    let p = relative(env.src, n)
	    let key = p.slice(0, p.indexOf(extname(p)))
	    let val = resolve(n)
	    let output = {}
	    output[key] = [val, webpackHMR]
	    return output
	}))
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
	const { basename, relative, extname, resolve } = path

        const app = express()

	javascriptdllBuilder(env)

        getJsFiles(majorPath)
            .then(normalizeFiles(env, majorPath))
            .then(javascriptServer(env, app))
            .catch(throwErr(gulp, 'javaScript-server'))
            .then(apiServer(app))
            .catch(throwErr(gulp, 'api-Server'))
            .then(browserServer(env, app))
            .catch(throwErr(gulp, 'browser-server'))
    }
}
