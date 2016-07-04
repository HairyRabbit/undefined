import path from 'path'

const $x = Object.assign
const {
    basename,
    relative,
    extname,
    resolve,
    join
} = path

function defineIgnoreNames(...patten) {
    return `[^${patten.join('')}]`
}

export function definePaths(...p) {
    return p.map(n => resolve(n))
}

class Environment {
    constructor(opts) {
	const defaultOptions = {
	    src: 'src',
	    lib: 'lib',
	    components: 'lib/components',
	    images: 'lib/images',
	    fonts: 'lib/fonts',	    
	    tmp: '.tmp',
	    dist: '.dist',
	    dll: '.tmp',
	    ignorePrivateFile: '_',
	    ignoreTmpFile: '\.#',
	    ignoreBackupFile: '~',
	    cssExtname: 'styl',
	    htmlExtname: 'html',
	    jsExtname: 'js'
	}
	
	const {
	    src, lib, tmp, dll, components, images,
	    cssExtname, htmlExtname, jsExtname,
	    ignorePrivateFile, ignoreTmpFile, ignoreBackupFile
	} = $x({}, defaultOptions, opts)
	
	this.src = src
	this.lib = lib
	this.tmp = tmp
	this.dll = dll
	this.components = components
	this.images = images
	this.cssExtname = cssExtname
	this.htmlExtname = htmlExtname
	this.jsExtname = jsExtname
	this.ignorePrivateFile = ignorePrivateFile
	this.ignoreTmpFile = ignoreTmpFile
	this.ignoreBackupFile = ignoreBackupFile
	this.init()
    }
    
    init() {
	
	const { src, lib, components,
		ignorePrivateFile,
		ignoreTmpFile,
		ignoreBackupFile
	      } = this
	
	this.paths = definePaths(src, lib, components)
	this.ignoresForMajor = defineIgnoreNames(ignorePrivateFile, ignoreTmpFile, ignoreBackupFile)
	this.ignores = defineIgnoreNames(ignoreTmpFile, ignoreBackupFile)
	// @fixme
	this.buildList = new BuildList(this.getMajorPath(this.cssExtname))
    }
    
    getMajorPath(extname) {
	const { src, ignoresForMajor } = this
	return `${src}/**/${ignoresForMajor}*.${extname}`
    }
    
    getMinorPath(extname) {
	const { src, lib, ignores } = this
	return [
	    `${lib}/**/${ignores}*.${extname}`,
	    `${src}/**/[_]*.${extname}`
	]
    }
}

export default function(opts) {
    return new Environment(opts)
}
