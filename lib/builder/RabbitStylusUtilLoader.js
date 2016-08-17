const RegexPathMatcher = /@[require|import]+\s+["|']([u|c|eu|ec]):(\w+)(\[([\w|\s|\$|=|,|"|'|:]*)\])?["|']/;

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

function trim(str) {
  if(!typeof str === 'string') throw new Error('trim need a string.')
  return str.trim()
}

function toPair([key, val]) {
  let out = {}
  out[key] = val
  return out
}

function split(separator) {
  return function(str) {
    return str.split(separator)
  }
}

function repairKey([key, val]) {
  return ['$' + key, val]
}

function repairValue([key, val]) {
  let str = trim(val)

  return [key, trim(val)]
}

function decodeParams(params) {
  return split(',')(params)
    .map(trim)
    .map(split(':'))
    .map(repairKey)
    .map(repairValue)
    .map(toPair)
}

function encodeParams(paramObj) {
  let out = []
  for(let k in paramObj) {
    out.push(`${k}=${paramObj[k]}`)
  }
  return out.join(',')
}


function loadConfigFile() {}
function mergeConfig() {}

function exportAutoloader(name, params) {
  let out = encodeParams(decodeParams(params))
  return `\nu-${name}-export(${out})}`
}


export default function(render) {

  let matched = render.str.match(RegexPathMatcher)

  if(matched) {
    let namespace = matched[1]
    let name = matched[2]
    let isAutoLoad = matched[3]
    let params = matched[4]

    let libpath = exportPathByNamespace(namespace, name)
    let autoload = isAutoLoad ? exportAutoloader(name, params) : ''

    render.str = render.str.replace(RegexPathMatcher, libpath + autoload)
  }

}
