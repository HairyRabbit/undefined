import fs from 'fs'
import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import HappyPack from 'happypack'
import browserSync from 'browser-sync'


function happyPackJsLoader() {
    return new HappyPack({
	      id: 'js',
	      threadPool: pool,
	      loaders: ['babel']
	  })
}

function happyPackTplLoader() {
    return new HappyPack({
		    id: 'html',
		    threadPool: pool,
		    loaders: ['nunjucks']
	  })
}

function happyPackElmLoader() {
    return new HappyPack({
		    id: 'elm',
		    threadPool: pool,
		    loaders: ['elm-hot', 'elm-webpack']
	  })
}


function webpackDllOutput(opts) {
    const defaultOptions = {
	      dllname: '[name].dll.js',
	      dlllib: '[name]_[hash]',
	      dllpath: '/',
	      dllmanifest: '[name]-manifest.json'
    }

    let { dllpath, dllname, dlllib, dllmanifest } = Object.assign({}, defaultOptions, opts)

    return {
	      output: {
	          path: path.resolve(dllpath),
	          filename: dllname,
	          library: dlllib
	      },
	      devtool: '#cheap-source-map',
	      plugins: [
	          new webpack.DllPlugin({
		            path: path.join(path.resolve(dllpath), dllmanifest),
		            name: dlllib
	          }),
	          new webpack.ProgressPlugin({
		            profile: false
	          })
	      ]
    }
}

export function webpackVendorOptions(env) {
    let pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'))
    let entries = {
	      entry: {
	          vendor: Object.keys(pkg.dependencies)
	      }
    }

    let output = webpackDllOutput({
	      dllpath: env.dll
    })

    return Object.assign({},
			                   entries,
			                   output)
}

export function webpackUtilOptions(env) {
    let files = glob.sync(path.resolve(env.lib, 'dll', '*.js'))
    let entries = {
	      entry: {
	          tool: files
	      }
    }
    let module = {
	      module: {
	          loaders: [{
		            test: /\.jsx?$/,
		            loader: 'happypack/loader?id=js',
		            exclude: /node_modules/
	          }]
	      }
    }

    let output = webpackDllOutput({
	      dllpath: env.dll
    })

    output.plugins.push(
        new HappyPack({
	          id: 'js',
	          threads: 2,
	          loaders: ['babel']
	      })
    )

    return Object.assign({},
			                   entries,
			                   module,
			                   output)
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


export function webpackDevOptions(opts) {
    let { majorPath, env } = opts
    let { basename, relative, extname, resolve } = path
    let pool = HappyPack.ThreadPool({ size: 6 })
    let filenames = glob.sync(majorPath)
    let hmr = 'webpack-hot-middleware/client?reload=true&overlay=true'
    let entries = {
        entry: Object.assign.apply(null, filenames.map(n => {
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
                {
		                test: /\.jsx?$/,
		                loader: 'happypack/loader?id=js',
		                exclude: [/node_modules/],
		            },
                {
		                test: /\.njk$/,
		                loader: 'happypack/loader?id=html',
		            },
		            {
		                test: /\.elm$/,
		                loader: 'happypack/loader?id=elm',
		                exclude: [/node_modules/, /elm-stuff/],
                    noParse: [/.elm$/]
		            }
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
        devtool: '#cheap-source-map'
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
		            loaders: ['babel']
	          }),
	          new HappyPack({
		            id: 'html',
		            threadPool: pool,
		            loaders: ['nunjucks']
	          }),
	          new HappyPack({
		            id: 'elm',
		            threadPool: pool,
		            loaders: ['elm-hot', 'elm-webpack?verbose=true&warn=true']
	          })
        ]
    }

    return Object.assign({},
                         entries,
                         modules,
                         output,
                         source,
                         resolves,
                         plugins)

}


export function webpackServerOptions() {
    return {
	      //noInfo: true,
	      //quiet: true,
	      inline: true,
	      watchOptions: {
	          poll: true
	      },
	      stats: {
	          colors: true
	      }
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