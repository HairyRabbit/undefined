import path from 'path'

function defineIgnoreNames(...patten) {
    return `[^${patten.join('')}]`
}

export function definePaths(...filepaths) {
    return filepaths.map(n => path.resolve(n))
}

class Environment {
    constructor(opts) {
	const defaultOptions = {
	    src: 'src',
	    lib: 'lib',
	    components: 'lib/components',
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
	this.opts = Object.assign({}, defaultOptions, opts)
	this.src = this.opts.src
	this.lib = this.opts.lib
	this.tmp = this.opts.tmp
	this.dll = this.opts.dll
	this.cssExtname = this.opts.cssExtname
	this.htmlExtname = this.opts.htmlExtname
	this.jsExtname = this.opts.jsExtname
	this.init()
    }
    init() {
	let { ignorePrivateFile,
	      ignoreTmpFile,
	      ignoreBackupFile,
	      src,
	      lib,
	      components
	    } = this.opts
	this.paths = definePaths(src, lib, components)
	this.ignoresForMajor = defineIgnoreNames(ignorePrivateFile,
						 ignoreTmpFile,
						 ignoreBackupFile)
	this.ignores = defineIgnoreNames(ignoreTmpFile,
					 ignoreBackupFile)
	this.buildList = new BuildList(this.getMajorPath(this.cssExtname))
    }
    getMajorPath(extname) {
	let { src, ignoresForMajor } = this
	return `${src}/**/${ignoresForMajor}*.${extname}`
    }
    getMinorPath(extname) {
	let { src, lib, ignores } = this
	return [`${lib}/**/${ignores}*.${extname}`,
		`${src}/**/[_]*.${extname}`]
    }
}

class BuildList {
    constructor(def, opts) {
	this.list = {}
	this.def = def
	this.current = void 0
	this.timer = null
	this.ticker = 2000
	this.timeout = 5000
	this.init()
    }
    init() {
	setInterval(::this.tick, this.ticker)
    }
    resetInit() {
	this.def = ''
    }
    getPath() {
	let li = Object.keys(this.list)
	return li.length ? li : this.def
    }
    update(filepath) {
	this.list[filepath] = Date.now()
    }
    remove(filepath) {
	delete this.list[filepath]
    }
    tick() {
	let now = Date.now()
	let iter = this.list
	for(let filepath in iter) {
	    if(now - iter[filepath] > this.timeout) {
		this.remove(filepath)
	    }
	}
    }
}


export default function(opts) {
    return new Environment(opts)
}
