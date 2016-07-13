/**
 * Build list.
 *
 * Whitelist, used for build muilt projects.
 * 
 * Strategy
 * 1. default - full rebuild
 * 2. timeout - package target with tick timeout
 * 3. keep    - the list item nerver removed
 * 4. lazy    - package target then lazy package all
 * 5. ast     - ast tree static analysis
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
	this.timer = null
	this.strategy = config.buildList.strategy
	this.ticker = config.buildList.tick
	this.timeout = config.buildList.timeout
	this.keepone = config.buildList.keepone
	this.init()
    }
    
    init() {
	if(this.strategy === 'timeout') {
	    return this.startTick()
	} else {
	    return this
	}
    }
    
    startTick() {
	this.timer = setInterval(::this.timeoutAction, this.ticker)
	return this
    }
    
    getPath() {
	const strategy = this.strategy
	
	if(strategy === 'default') {
	    return null
	} else if(strategy === 'timeout') {
	    let li = Object.keys(this.list)
	    return li.length ? li : null
	} else {
	    throw new Error(`Unknow build list strategy ${strategy}`)
	}
	
    }
    
    /**
     * Add or update to list, used for `timeout`.
     */
    update(filepath) {
	this.list[filepath] = Date.now()
    }
    
    /**
     * Remove from list, used for `timeout`.
     */
    remove(filepath) {
	delete this.list[filepath]
    }
    
    timeoutAction() {
	const now = Date.now()
	const iter = this.list
	
	// Hands up! keep one all or remove all
	if(this.keepone && Object.keys(this.list).length <= 1) return this

	const isTimeout = datetime => now - datetime > this.timeout

	// Timeout!
	for(let k in iter)
	    if(isTimeout(iter[k]))
		this.remove(k)

	return this
    }
}


export default function(opts) {
    return new BuildList(opts)
}
