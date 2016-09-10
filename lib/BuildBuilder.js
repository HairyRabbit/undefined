import Path from 'path'
import webpack from 'webpack'
import mergeAll from 'ramda/src/mergeAll'
import RenderHTMLWebpackPlugin from './RenderHTMLWebpackPlugin'

const entry = {
  entry: Path.resolve('lib/WebpackSimple')
}

const output = {
  output: {
    path: Path.resolve('builder'),
    filename: 'builder.js',
    libraryTarget: 'commonjs2'
  }
}


class ShowCompilationPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      console.log("compilation.assets", compilation.assets)

      compilation.chunks.forEach(chunk => {
        console.log("compilation.chunk", chunk)

        chunk.modules.forEach(module => {
          console.log("chunk.module", module)

          module.fileDependencies.forEach(filepath => {
            console.log("module.fileDependencies", filepath)
          })
        })

        chunk.files.forEach(filename => {
          console.log("chunk.file", filename)
        })
      })


      callback()

    })
  }
}

const options = mergeAll([entry, output, {
  target: 'node',
  node: {
    fs: 'empty',
    path: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [{
          loader: 'babel',
          query: {
            presets: [
              [ 'es2015', { modules: false } ]
            ]
          }
        }]
      }
    ]
  },
  recordsPath: Path.resolve('lib/r'),
  ///*
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.dependencies.LabeledModulesPlugin(),
    new RenderHTMLWebpackPlugin(),
    new ShowCompilationPlugin(),
    /*
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      minimize: true,
      debug: true,
      exclude: /node_modules/
    })
    */
  ]
  //*/
}])

console.log(options)

const compiler = webpack(options)

const compileDone = (err, stat) => {
  console.log(stat.toString({
    color: true
  }))
}

compiler.run(compileDone)
