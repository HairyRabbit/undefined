import fs from 'fs'
import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import HappyPack from 'happypack'

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
