// -*- mode: js2 -*-

/*eslint semi: ["error", "never"] */


/**
 * Builder configs.
 */

import includes from 'core-js/library/fn/array/includes'
import fs from 'fs'
import toml from 'toml'
import tomlify from 'tomlify-j0.4'
import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import postcss from 'postcss'
import nunjucks from 'nunjucks'
import HappyPack from 'happypack'
import browserSync from 'browser-sync'
import postcssShort from 'postcss-short'
import {
  fmtError,
  drawWebpackCollect,
  drawDllBlackListInfo,
  drawDllDepsChanged,
} from './log'


const {
  basename,
  relative,
  extname,
  resolve,
  join
} = path

const $x = Object.assign
const configPath = resolve('.rabbit')
const config = toml.parse(fs.readFileSync(configPath))


/**
 * ES2015 webpack loader
 */
function esLoader() {
  return {
	  test: /\.jsx?$/,
	  loader: 'happypack/loader?id=js',
	  exclude: /node_modules/
  }
}

/**
 * Typescript webpack loader
 */
function tsLoader() {
  return {
	  test: /\.tsx?$/,
	  //loader: 'happypack/loader?id=ts',
    loader: 'ts'
	  //exclude: /node_modules/
  }
}

/**
 * JSON webpack loader
 */
function jsonLoader() {
  return {
	  test: /\.json$/,
    loader: 'json'
  }
}

function stylusLoader() {
  return {
    test: /\.styl$/,
    exclude: /node_modules/,
    loader: 'happypack/loader?id=stylus'
  }
}


/**
 * Elm webpack loader
 */
function elmLoader() {
  return {
	  test: /\.elm$/,
	  loader: 'happypack/loader?id=elm',
	  exclude: [/node_modules/, /elm-stuff/],
    noParse: [/.elm$/]
  }
}


/**
 * nunjucks template webpack loader
 */
function njkLoader() {
  return {
	  test: /\.njk$/,
	  loader: 'happypack/loader?id=html'
  }
}

/**
 * Dll 公用输出配置
 *
 * 1. 这里不能用[hash], 原因是再次打包会找不到manifest文件
 */
function webpackDllOutput(opts) {

  const defaultOptions = {
	  dllname: '[name].dll.js',
	  dlllib: '[name]', /* 1 */
	  dllpath: '/',
	  dllmanifest: '[name]-manifest.json'
  }

  const {
	  dllpath,
	  dllname,
	  dlllib,
	  dllmanifest
  } = Object.assign({}, defaultOptions, opts)

  return {
	  output: {
	    path: resolve(dllpath),
	    filename: dllname,
	    library: dlllib
	  },
	  //devtool: '#cheap-source-map',
    module: {
      loaders: [jsonLoader()]
    },
	  plugins: [
	    new webpack.DllPlugin({
		    path: join(resolve(dllpath), dllmanifest),
		    name: dlllib
	    }),
	    new webpackDllCannotFindPlugin()
	  ]
  }
}


/**
 * `.rabbit` config file banner.
 *
 * Append to file header when config file rewrite.
 */
function configFileBanner() {
  return fs.readFileSync(
	  resolve('lib/tpls', 'config-header.html'),
	  'utf-8'
  )
}


/**
 * Dll black list.
 *
 * @class
 */
class DllBlackList {
  get() {
	  return config.dll.blackList
  }
  set(names) {
    names.forEach(n => {
      if(includes(n, this.get())) return null
      return config.dll.blackList.push(n)
    })

	  const output = [configFileBanner(), tomlify(config, null, 2)].join('\n')

    fs.writeFile(configPath, output, err => {
      if(err) throw new err /* @fixme need emit error */
      //console.log(names)
      drawDllBlackListInfo(names)
    })
	  return this
  }
}

/**
 * DepsNotice
 *
 */
class DepsNotice {
  constructor() {
    this.depsCache = []
  }
  len() {
    return this.get().length
  }
  get() {
    return this.depsCache
  }
  set(arr) {
    this.depsCache = arr
    return this
  }
  compare(deps) {
    function contain(a, b) {
      return a.filter(n => !includes(b, n))
    }

    if(deps.length > this.len()) {
      return {
        action: 'added',
        data: contain(deps, this.get())
      }
    } else if(deps.length < this.len()) {
      return {
        action: 'removed',
        data: contain(this.get(), deps)
      }
    } else {
      return false
    }
  }
  report(deps) {
    const cmp = this.compare(deps)
    if(cmp) {
      drawDllDepsChanged(cmp)
      this.set(deps)
    }
    return deps
  }
}


const dllBlackList = new DllBlackList()
const depsNotice = new DepsNotice()

function filterDllBlackList(lib) {
  return !includes(dllBlackList.get(), lib)
}

function getDependencies() {
  const deps = Object.keys(JSON.parse(
    fs.readFileSync(resolve('package.json'), 'utf-8')
  ).dependencies)

  if(!depsNotice.len()) depsNotice.set(deps)

  return deps
}

export function webpackVendorOptions(env) {
  const deps = depsNotice.report(getDependencies())

  env.evt.emit('test')
  const entries = {
	  entry: {
	    vendor: deps.filter(filterDllBlackList)
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
  //let filenames = glob.sync(env.getMajorPath(env.jsExtname))
  let filenames = glob.sync(env.getJsMajorPath())
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
        //tsLoader(),
        jsonLoader(),
        njkLoader(),
        elmLoader(),
        stylusLoader(),
      ],
      noParse: [/.elm$/]
	  },
    stylus: stylusOptions(env),
    postcss: postcssOptions(env),
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
      //new rabbitModulesSizeAnalysis(),
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
      /*
        new HappyPack({
		    id: 'ts',
		    threadPool: pool,
		    loaders: ['ts'],
		    verbose: false
	      }),
      */
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
	    }),
      new HappyPack({
		    id: 'stylus',
		    threadPool: pool,
		    loaders: ['style', 'css', 'postcss', 'stylus'],
		    verbose: false
	    }),
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
  let port = config.server.port || 8888

  return {
	  port: port,
	  ui: false,
	  //logLevel: 'silent',
	  open: false,//true, //false
	  startPath: '/',
	  server: env.tmp,
	  plugins: [{
	    module: 'bs-html-injector',
	    options: {
		    files: `${env.tmp}/**/*.html`,
		    excludedTags: 'BODY'
	    }
	  }],
	  middleware: [app] /* 1 */
  }
}

/**
 * Get projects path
 *
 * Used for join the nunjucks paths.
 */
function getProjects(env) {
  return glob.sync(`${env.src}/[^_]*/`)
}

/**
 * Nunjucks addons.
 *
 * Define filters, globals & extensions here.
 */
function nunjucksEnvAddons(env) {
  env.addFilter('assign', (opts, ...args) => {
	  return Object.assign.apply(null, [{}].concat(opts).concat(args))
  })
}

/**
 * Nunjucks options
 *
 * 1. relative path with the current projects.
 */
export function nunjucksOptions(env) {
  return {
	  path: env.paths.concat(getProjects(env)), /* 1 */
	  envOptions: {
	    watch: false,
	    noCache: false
	  },
	  manageEnv: nunjucksEnvAddons
  }
}

export function stylusOptions(env) {
  return {
	  include: env.paths,
	  use: [transformComponentPathForStylus]
  }
}

export function postcssOptions(env) {
  return [
    postcssRabbit(),
	  postcssShort()
  ]
}

export function watcherIgnoreOptions(env) {
  return {
	  ignored: [
	    relative(process.cwd(), resolve(env.components, '**')),
	    relative(process.cwd(), resolve(env.injects, '**')),
	  ]
  }
}

export function entryIgnoreOptions(env) {
  return {
	  ignore: [
	    resolve(env.components, '**'),
	    resolve(env.injects, '**')
	  ]
  }
}


/**
 * Pick err lib's name
 *
 * @todo checkout `Module parse failed` error, eg Angular2
 * Just throw a error. Maybe happen with webpack loader.
 */
function webpackCannotResolve(msg) {
  const matched = msg.match(/Can't resolve [\"|\']([\w|-]+)[\"|\'] in/)
  if(!matched) {
    console.log(msg)
    throw new Error(`Cann't match module names.`)
  }
  return matched[1]
}


class webpackDllCannotFindPlugin {
  apply(compiler) {
	  compiler.plugin('done', function(stats) {
	    const { errors } = stats.toJson()
	    if(errors.length) dllBlackList.set(errors.map(webpackCannotResolve))
	  })
  }
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
      //console.log(stats.toString())
	  })
  }
}

class rabbitModulesSizeAnalyzer {
  apply(compiler) {
    compiler.plugin('done', function(stats) {


      let st = stats.toJson()

      st.chunks.forEach(
        c => {
          console.log(`${c.size} -> ${c.files[0]}`)
          st.modules.filter(m => includes(m.chunks, c.id)).sort(
            (a, b) => b.size - a.size
          ).forEach(
            m => {
              console.log(`  |- ${m.size} -> ${m.name}`)
            }
          )
        }
      )

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
    ["padding", "p", "pad", "pa", "内补"], /* 1 */
	  ["padding-left", "pl", "pad-l", "padl", "左内补"],
	  ["padding-right", "pr", "pad-r", "padr", "右内补"],
	  ["padding-top", "pt", "pad-t", "padt", "上内补"],
	  ["padding-bottom", "pb", "pad-b", "padb", "下内补"],
	  [["padding-top", "padding-bottom"], "py", "pad-y", "pady", "上下内补"],
	  [["padding-left", "padding-right"], "px", "pad-x", "padx", "左右内补"],

    ["margin", "m", "ma", "mar", "外补"],
	  ["margin-left", "ml", "mar-l", "marl", "左外补"],
	  ["margin-right", "mr", "mar-r", "marr", "右外补"],
	  ["margin-top", "mt", "mar-t", "mart", "上外补"],
	  ["margin-bottom", "mb", "mar-b", "marb", "下外补"],
	  [["margin-top", "margin-bottom"], "my", "mar-y", "mary", "上下外补"],
	  [["margin-left", "margin-right"], "mx", "mar-x", "marx", "左右外补"],

    ["border", "bd", "边框"],
	  ["border-left", "bdl", "左边框"],
	  ["border-right", "bdr", "右边框"],
	  ["border-top", "bdt", "上边框"],
	  ["border-bottom", "bdb", "下边框"],
	  ["border-radius", "bdrz", "bdra", "圆角"],
	  ["border-top-left-radius", "bdrztl"],
	  ["border-top-right-radius", "bdrztr"],
	  ["border-bottom-left-radius", "bdrzbl"],
	  ["border-bottom-right-radius", "bdrzbr"],
	  [["border-bottom-left-radius", "border-top-left-radius"], "bdrzl"],
	  [["border-bottom-right-radius", "border-top-right-radius"], "bdrzr"],
	  [["border-top-left-radius", "border-top-right-radius"], "bdrzt"],
	  [["border-bottom-left-radius", "border-bottom-right-radius"], "bdrzb"],
	  ["border-color", "bdc"],
	  ["border-width", "bdw"],

	  ["width", "w"],
	  ["height", "h"],
	  ["min-width", "miw"],
	  ["max-width", "maw"],
	  ["min-height", "mih"],
	  ["max-height", "mah"],

    ["font-family", "ff", "字体"],
    ["font-size", "fz", "字号", "字体大小"],
    ["font-weight", "fw", "字体粗细"],
    ["font-style", "fs", "字体样式"],
	  ["text-align", "ta", "水平对齐"],
	  ["text-decoration", "td"],
    ["line-height", "lh"],
    ["vertical-align", "va"],


    ["box-sizing", "box", "盒子"],
	  ["color", "c", "cc", "颜色"],
    ["opacity", "op", "透明度"],
    ["background-color", "bgc", "背景色"],
    ["background", "bg", "背景"],

    ["overflow", "ov"],
    ["overflow-x", "ovx"],
    ["overflow-y", "ovy"],

	  ["position", "pos"],
	  ["top", "t"],
	  ["right", "r"],
	  ["bottom", "b"],
	  ["left", "l"],
	  ["z-index", "z"],

	  ["display", "dis"],
    ["float", "fl"],

	  ["transform", "tf"],
	  ["transition", "trans"],
	  ["transition-delay", "trans-delay"],
	  ["animation", "anim"],
	  ["animation-name", "anim-name"],

	  ["box-shadow", "shadow"],

	  ["list-style-type", "lity"],

    ["pointer-events", "pe"],
	  ["cursor", "cur"],

	  ["content", "ctx"],
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
    ["normal", "n"],
    ["inherit", "ext"],
    ["baseline", "base"],
    ["transparent", "a0"],
    ["hidden", "h"],
    ["auto", "a"],
	  ["relative", "rela"],
	  ["absolute", "abso"],
	  ["block", "bl"],
	  ["inline", "il"],
	  ["inline-block", "ib"],
	  ["center", "cen"],
	  ["left", "l"],
    ["right", "r"],
	  ["none", "no"],
	  ["pointer", "ptr"],
	  ["50%", "helf", "circle"],
  ]
}


/**
 * Rabbit's Postcss plugin.
 *
 * A name alias with props and values.
 *
 * @todo Cached for props.
 * The props has muilt values.
 */
function postcssRabbit() {
  return postcss.plugin('rabbit', opts => {
    let options = Object.assign({}, opts)
    let props = rabbitCSSProps()
    let vals = rabbitCSSVals()
    let cacheProps = []
    let cacheVals = []

	  function replaceProps(decl) {

	    props.forEach(n => {
        if(includes(n.slice(1), decl.prop)) {
		      let ps = n[0]
		      if(Array.isArray(ps)) {
			      decl.prop = ps[0]
			      ps.slice(1).forEach(m => {
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
      if(cacheVals[decl.value]) {
        decl.value = cacheProps[decl.value]
        return
      }

	    vals.forEach(n => {

        let values = decl.value.trim().split(' ').map(m => {
          if(!includes(n.slice(1), m)) return m
          return n[0]
        }).join(' ')

        decl.value = values

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
