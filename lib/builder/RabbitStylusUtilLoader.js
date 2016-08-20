/**
 *
 */


import fs from 'fs'
import path from 'path'
import { trim, split } from 'ramda'


const RegexPathMatcher = /@[require|import]+\s+["|']([u|c]):(\w+)(\[([\w|\s|\$|=|,|"|'|:]*)\])?(\!?)["|']/

const StylusImportorPrefix = "@require"
const RabbitStylesPath = "styles"
const RabbitUtilNamespace = "util"


function exportPathByNamespace(namespace, name) {
  switch(namespace) {
  case "u": return `${StylusImportorPrefix} "${RabbitStylesPath}/${RabbitUtilNamespace}/${name}"`
  //case "c": return "component"
  default: throw new Error(`Unkown control ${control}}.`)
  }
}

/*
function trim(str) {
  if(!typeof str === 'string') throw new Error('trim need a string.')
  return str.trim()
}
*/

function toPair([key, val]) {
  let out = {}
  out[key] = val
  return out
}


/*
function split(separator) {
  return function(str) {
    return str.split(separator)
  }
}
*/

function repairKey([key, val]) {
  return ['$' + key, val]
}

function prefixKey(key) {
  return '$' + key
}

function repairValue([key, val]) {
  let str = trim(val)

  return [key, trim(val)]
}

function decodeParams(params) {
  console.log("params:", params)
  let paramsPair = split(',')(params)
    .map(trim)
    .map(split(':'))
    .map(repairKey)
    .map(repairValue)
    .map(toPair)

  return Object.assign.apply(null, paramsPair)
}

function encodeParams(paramObj) {
  let out = []
  for(let k in paramObj) {
    out.push(`${k}:${paramObj[k]}`)
  }
  return out.join(',')
}

function mapObjectKey(call) {
  return function(obj) {
    let out = []
    for(let k in obj) {
      let res = {}
      res[call(k)] = obj[k]
      out.push(res)
    }
    return Object.assign.apply(null, out)
  }
}

function mapObjectVal(call) {
  return function(obj) {
    let out = []
    for(let k in obj) {
      let res = {}
      res[k] = call(obj[k])
      out.push(res)
    }
    return Object.assign.apply(null, out)
  }
}

function forwardPath(filepath) {
  return path.join(filepath, '../../', 'rabbit.json')
}

function isRootPath(filepath, root) {
  return path.relative(filepath, root) === ''
}


function loadConfigFile(filepath) {

  let root = 'f:/atlantis/rabbit.json'

  let searched = (function recur(filepath) {
    if(isRootPath(filepath, root)) return filepath
    if(fs.existsSync(filepath)) return filepath
    return recur(forwardPath(filepath))
  })(path.join(path.resolve(filepath), '../rabbit.json'))

  let rabbitConfig = require(searched)

  return rabbitConfig.styles
}


function mergeConfig(namespace, name, options) {
  return function(obj) {
    let opts = mapObjectKey(prefixKey)(options[namespace][name])
    return Object.assign({}, opts, obj)
  }
}

function id(x) { return x }


function exportAutoloader(name, params, ismerge, namespace, filepath) {
  let adapter = ismerge ? mergeConfig(namespace, name, loadConfigFile(filepath)) : id
  let out = params ? encodeParams(adapter(decodeParams(params))) : ''
  return `\nu-${name}-export(${out})`
}


function parseLine(render, line) {
  let matched = render.str.match(RegexPathMatcher)

  if(matched) {
    let [
      _,
      namespace,
      name,
      isAutoLoad,
      params,
      isMergeConfig
    ] = matched


    let libpath = exportPathByNamespace(namespace, name)
    let autoload = isAutoLoad ? exportAutoloader(
      name,
      params,
      !!isMergeConfig,
      "util",
      render.options.filename
    ) : ''

    render.str = render.str.replace(RegexPathMatcher, libpath + autoload)
  }
}


const AliasUtilNamespace = 'u'
const AliascomponentNamespace = 'c'


const splitLine = split('\n')



export default function RabbitStylusUtilLoader(render) {

  let lines = render.str.split('\n')

  let { str, options } = render
  let { filename } = options

  for(let i in lines) {
    parseLine(render, lines[i])
  }
}
