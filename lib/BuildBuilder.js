import Path from 'path'
import webpack from 'webpack'
import mergeAll from 'ramda/src/mergeAll'

const entry = {
  entry: Path.resolve('lib/UpwardSearchFile')
}

const output = {
  output: {
    path: Path.resolve('builder'),
    filename: 'builder.js',
    libraryTarget: 'commonjs2'
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
  ///*
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.dependencies.LabeledModulesPlugin(),
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
