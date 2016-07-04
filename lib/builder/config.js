import includes from 'core-js/library/fn/array/includes'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import postcss from 'postcss'
import HappyPack from 'happypack'
import browserSync from 'browser-sync'
import postcssShort from 'postcss-short'

import {
    fmtError,
    drawWebpackCollect
} from './log'

const {
    basename,
    relative,
    extname,
    resolve,
    join
} = path

const $x = Object.assign

function esLoader() {
    return {
	test: /\.jsx?$/,
	loader: 'happypack/loader?id=js',
	exclude: /node_modules/
    }
}

function elmLoader() {
    return {
	test: /\.elm$/,
	loader: 'happypack/loader?id=elm',
	exclude: [/node_modules/, /elm-stuff/],
        noParse: [/.elm$/]
    }
}

function njkLoader() {
    return {
	test: /\.njk$/,
	loader: 'happypack/loader?id=html'
    }
}

function webpackDllOutput(opts) {

    const defaultOptions = {
	dllname: '[name].dll.js',
	dlllib: '[name]_[hash]',
	dllpath: '/',
	dllmanifest: '[name]-manifest.json'
    }

    const {
	dllpath,
	dllname,
	dlllib,
	dllmanifest
    } = $x({}, defaultOptions, opts)

    return {
	output: {
	    path: resolve(dllpath),
	    filename: dllname,
	    library: dlllib
	},
	devtool: '#cheap-source-map',
	plugins: [
	    new webpack.DllPlugin({
		path: join(resolve(dllpath), dllmanifest),
		name: dlllib
	    }),
	    /*
	      new webpack.ProgressPlugin({
	      profile: false
	      })
	    */
	]
    }
}

export function webpackVendorOptions(env) {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))
    const entries = {
	entry: {
	    vendor: Object.keys(pkg.dependencies)
	}
    }

    const output = webpackDllOutput({
	dllpath: env.dll
    })

    return $x({}, entries, output)
}

export function webpackUtilOptions(env) {
    let files = glob.sync(resolve(env.lib, 'dll', '*.js'))
    let entries = {
	entry: {
	    tool: files
	}
    }
    let module = {
	module: {
	    loaders: [esLoader()]
	}
    }

    let output = webpackDllOutput({
	dllpath: env.dll
    })

    output.plugins.push(
        new HappyPack({
	    id: 'js',
	    threads: 2,
	    loaders: ['babel?cacheDirectory=true'],
	    verbose: false
	})
    )

    return $x({}, entries, module, output)
}

export function webpackLogOptions() {
    return {
	hash: false,
	colors: true,
	chunks: false,
	chunkModules: false,
	version: false,
	reasons: true
    }
}


export function webpackDevOptions(env) {

    let pool = HappyPack.ThreadPool({ size: 6 })

    let filenames = glob.sync(env.getMajorPath(env.jsExtname))

    let hmr = 'webpack-hot-middleware/client?reload=true&overlay=true'

    let entries = {
        entry: $x.apply(null, filenames.map(n => {
            let p = relative(env.src, n)
            let key = p.slice(0, p.indexOf(extname(p)))
            let val = resolve(n)
            let output = {}
            output[key] = [val, hmr]
            return output
        }))
    }

    let modules = {
        module: {
            loaders: [
                esLoader(),
                njkLoader(),
                elmLoader()
            ]
	}
    }

    let output = {
        output: {
	    path: resolve(env.tmp),
	    publicPath: '/', /* 1 */
	    filename: '[name].js'
	}
    }

    let source = {
        devtool: 'source-map'//'#cheap-source-map'
    }

    let resolves = {
        resolve: {
            modules: [
                'node_modules',
                resolve(env.tmp)
            ].concat(env.paths.concat('/').map(n => resolve(n)))
        }
    }

    let plugins = {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('commons'),
	    new webpack.HotModuleReplacementPlugin(),
            ///*
            new webpack.SourceMapDevToolPlugin({

            }),

	    //new webpack.ProgressPlugin(),
	    //*/
	    new webpackReportDuringPlugin(),
	    new webpackReportErrorPlugin(),
	    new webpack.DllReferencePlugin({
		context : '.',
		manifest: require(resolve(env.dll, 'vendor-manifest.json'))
            }),
	    new webpack.DllReferencePlugin({
		context : '.',
		manifest: require(resolve(env.dll, 'tool-manifest.json'))
            }),
	    new HappyPack({
		id: 'js',
		threadPool: pool,
		loaders: ['babel?cacheDirectory=true'],
		verbose: false
	    }),
	    new HappyPack({
		id: 'html',
		threadPool: pool,
		loaders: ['nunjucks'],
		verbose: false
	    }),
	    new HappyPack({
		id: 'elm',
		threadPool: pool,
		loaders: ['elm-hot', 'elm-webpack'],
		verbose: false
	    })
        ]
    }

    return $x({},
              entries,
              modules,
              output,
              source,
              resolves,
              plugins)

}


export function webpackServerOptions() {
    return {
	noInfo: true,
	quiet: true,
	inline: true,
	watchOptions: {
	    poll: true
	},
	stats: false
    }
}

export function webpackHMROptions() {
    return {
	log: false
    }
}

export function browserServerOption(opts) {
    let { env, app } = opts
    let browser = browserSync.create()
    let port = 8888

    return {
	port: port,
	ui: false,
	//logLevel: 'silent',
	open: false,//true, //false
	startPath: '/',
	server: env.tmp,
	middleware: [app] /* 1 */
    }
}


export function nunjucksOptions(env) {
    return {
	path: env.paths,
	envOptions: {
	    watch: false,
	    noCache: false
	}
    }
}

export function stylusOptions(env) {
    return {
	include: env.paths,
	use: transformComponentPathForStylus
    }
}

export function postcssOptions(env) {
    return [
        postcssRabbit(),
	postcssShort()
    ]
}

class webpackReportErrorPlugin {
    apply(compiler) {
	compiler.plugin('done', function(stats) {
	    let errs = stats.toJson().errors
	    if(errs.length) fmtError('js', errs)
	})
    }
}

class webpackReportDuringPlugin {
    apply(compiler) {
	compiler.plugin('done', function(stats) {
	    let during = stats.toJson().time
	    drawWebpackCollect('js', during)
	})
    }
}

function transformComponentPathForStylus(render) {
    render.str = render.str.replace(/[\"|\']@(\w+)[\"|\']/, '\"$1/index\"')
}

/**
 * CSS property alias
 *
 * 1. p is a stylus build-in function.
 * http://stylus-lang.com/docs/bifs.html#pexpr
 */
function rabbitCSSProps() {
    return [
        ["padding", "p", "pad", "内补"], /* 1 */
	["padding-left", "pl", "pad-l", "padl", "左内补"],
	["padding-right", "pr", "pad-r", "padr", "右内补"],
	["padding-top", "pt", "pad-t", "padt", "上内补"],
	["padding-bottom", "pb", "pad-b", "padb", "下内补"],
	[["padding-top", "padding-bottom"], "py", "pad-y", "pady", "上下内补"],
	[["padding-left", "padding-right"], "px", "pad-x", "padx", "左右内补"],
	
        ["margin", "m", "mar", "外补"],
	["margin-left", "ml", "mar-l", "marl", "左外补"],
	["margin-right", "mr", "mar-r", "marr", "右外补"],
	["margin-top", "mt", "mar-t", "mart", "上外补"],
	["margin-bottom", "mb", "mar-b", "marb", "下外补"],
	[["margin-top", "margin-bottom"], "my", "mar-y", "mary", "上下外补"],
	[["margin-left", "margin-right"], "mx", "mar-x", "marx", "左右外补"],
	
        ["box-sizing", "box", "盒子"],
	["color", "c", "cc", "颜色"],
    ]
}

function rabbitCSSPropsShorthand() {
    return [
	["padding", "px-", "py-", "pt-", "pr-", "pb-", "pl-"],
	["margin", "mx-", "my-", "mt-", "mr-", "mb-", "ml-"],
    ]
}

function rabbitCSSVals() {
    return [
        ["border-box", "bdbox", "bd-box"],
	["content-box", "cbox", "ctbox", "c-box", "ct-box"],
	["padding-box", "pbox", "padbox", "p-box", "pad-box"],
    ]
}

function postcssRabbit() {
    return postcss.plugin('rabbit', opts => {
        let options = Object.assign({}, opts)
        let props = rabbitCSSProps()
        let vals = rabbitCSSVals()

	function replaceProps(decl) {
	    props.forEach(n => {
                if(includes(n.slice(1), decl.prop)) {
		    let ps = n[0]
		    if(Array.isArray(ps)) {
			ps.forEach(m => {
			    decl.cloneAfter({
				prop: m,
				value: decl.value
			    })
			})
		    } else {
			decl.prop = ps
		    }
                }
            })
	}

	function replaceVals(decl) {
	    vals.forEach(n => {
                if(includes(n.slice(1), decl.value)) {
                    decl.value = n[0]
                    //decl.value = decl.value.replace(value, key)
                }
            })
	}

	return css => {
	    css.walkDecls(decl => {
                replaceProps(decl)
		replaceVals(decl)
	    })
	}
    })
}
