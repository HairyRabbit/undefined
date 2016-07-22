import fs from 'fs'
import path from 'path'
import querystring from 'querystring'
import toml from 'toml'
import buildList from './buildlist'
import EventEmitter from 'events'


const {
  basename,
  relative,
  extname,
  resolve,
  join
} = path


const $x = Object.assign
const config = toml.parse(fs.readFileSync(path.resolve('.rabbit')))


function defineIgnoreNames(...patten) {
  return `[^${patten.join('')}]`
}

function definePaths(...p) {
  return p.map(n => resolve(n))
}

class RabbitEmitter extends EventEmitter {}

class Environment {
  constructor(opts) {
	  
	  this.src = config.environment.src
	  this.lib = config.environment.lib
	  this.tmp = config.environment.tmp
	  this.dll = config.environment.dll
    this.test = config.environment.test
	  // @todo components name need reversed.
	  this.components = config.environment.components
	  this.injects = config.environment.injects
	  this.images = config.environment.images
	  this.fonts = config.environment.fonts
	  this.takerSuffix = config.environment.takerSuffix

	  this.cssExtname = config.extname.css
	  this.htmlExtname = config.extname.html
	  this.jsExtname = config.extname.js

	  this.ignorePrivateFile = config.ignores.private
	  this.ignoreTmpFile = config.ignores.tmp
	  this.ignoreBackupFile = config.ignores.backup
	  
	  this.init()
  }
  
  init() {
	  
	  const {
	    src, lib, components,
	    ignorePrivateFile,
	    ignoreTmpFile,
	    ignoreBackupFile
	  } = this

	  
	  this.paths = definePaths(src, lib, components)
	  this.ignoresForMajor = defineIgnoreNames(ignorePrivateFile, ignoreTmpFile, ignoreBackupFile)
	  this.ignores = defineIgnoreNames(ignoreTmpFile, ignoreBackupFile)

	  this.taskType = {
	    style: 'style',
	    page: 'page'
	  }

    this.evt = new RabbitEmitter()
    this.eventBinding()
	  
	  // @fixme
	  //this.buildList = buildList(this.getMajorPath(this.cssExtname))
  }
  
  getMajorPath(extname) {
	  const { src, ignoresForMajor } = this
	  return `${src}/**/${ignoresForMajor}*.${extname}`
	  //return `${src}/**/index.${extname}`
  }

  getJsMajorPath() {
    const { src, ignoresForMajor } = this
	  return `${src}/**/${ignoresForMajor}[^api]*.+(t|j)s`
  }
  
  getMinorPath(extname) {
	  const { src, lib, ignores, components, injects } = this
	  return [
	    `${lib}/**/${ignores}*.${extname}`,
	    `${src}/**/[_]*.${extname}`,
	    `${components}/**/${ignores}*.${extname}`,
	    `${injects}/**/${ignores}*.${extname}`,
	  ]
  }
  eventBinding() {
    this.evt.on('error', err => {
      throw err
    })
    /*
    this.evt.on('GetLocateError', (file, line, char) => {
      let queries = querystring.stringify({
        cmd: "LocateError",
        file: file,
        line: line,
        char: char
      })

      //console.log(queries)

      this.evt.emit('PostLocateErrorToSocket', queries)
      
    })
    */
  }
}

export default function(opts) {
  return new Environment(opts)
}



