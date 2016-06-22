import path from 'path'
import glob from 'glob'
import express from 'express'
import morgan  from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const router = express.Router()
const browser = browserSync.create()
const app = express()

function webpackOptions(env, entries) {
    return {
	entry: entries,
	output: {
	    path: path.resolve(env.tmp),
	    publicPath: '/',
	    filename: '[name].js'
	},
	module: {
            loaders: [{
		test: /\.jsx?$/,
		loader: 'babel'
            }, {
		test: /\.njk$/,
		loader: 'nunjucks'
            }]
	},
	resolve: {
            root: env.paths.concat('./').map(n => path.resolve(n))
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin('commons.js'),
	    new webpack.HotModuleReplacementPlugin()
	]
    }
}

function webpackServerOptions() {
    return {
	stats: {
	    colors: true
	}
    }
}

function relativePath(target, src) {
    return path.relative(target, src)
}

function api() {
    return router
}

app.use(cors())
    .use(compression())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/api', api())

const port = 8888

export default function (js) {
    return function server() {

	let env = js.env
	let { basename, relative, extname, resolve } = path
	
	glob(js.majorPath, (err, files) => {
	    let entry = Object.assign.apply(null, files.map(n => {
		let p = relative(env.src, n)
		let key = p.slice(0, p.indexOf(extname(p)))
		let val = resolve(n)
		let output = {}
		output[key] = [val, `webpack-hot-middleware/client?reload=false&overlay=true`]
		return output
	    }))


	    
	    let config = webpackOptions(env, entry)
	    let complier = webpack(config)
	    let devServer = webpackDevMiddleware(complier, webpackServerOptions())
	    let hotServer = webpackHotMiddleware(complier)

	    app.use(devServer)
	    app.use(hotServer)

	    browser.init({
		port: port,
		ui: false,
		//logLevel: 'silent',
		open: false,
		startPath: '/index/',
		server: {
		    baseDir: env.tmp
		},
		middleware: [app]
	    })
	})
    }
}
