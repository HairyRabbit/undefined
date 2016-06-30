/**
 * Build list
 *
 * Used for increment build
 */

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