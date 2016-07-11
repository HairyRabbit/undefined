/**
 * Build list.
 *
 * Whitelist, used for build muilt projects.
 * 
 * Strategy
 * 1. none   - full rebuild [defualt]
 * 2. target - package target with tick timeout
 * 3. lazy   - package target then lazy package all
 * 4. ast    - ast tree
 */
import fs from 'fs'
import toml from 'toml'
import path from 'path'

const $x = Object.assign
const configPath = path.resolve('.rabbit')
const config = toml.parse(fs.readFileSync(configPath))

class BuildList {
    constructor() {
	this.list = {}
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
	return this
    }
    getPath() {
	const strategy = config.buildList.strategy
	
	if(strategy === 'default') {
	    return null
	} else if() {
	    let li = Object.keys(this.list)
	    return li.length ? li : null
	} else {
	    throw new Error(`Unknow build list strategy ${strategy}`)
	}
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
	if(Object.keys(this.list).length <= 1) return this
	for(let filepath in iter) {
	    if(now - iter[filepath] > this.timeout) {
		this.remove(filepath)
	    }
	}

	return this
    }
}


export default function(opts) {
    return new BuildList(opts)
}
