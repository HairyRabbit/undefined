import path from "path"
import { drawCollect } from './log'

const { relative, resolve, extname } = path
//const cache = new CollecterCache()


function isSourceMapFile(path) {
    return extname(path) === '.map'
}


/**
 * st 1 cmp to fixed timing
 * st 2 cmp to before
 * 1. good
 * 2. warning
 * 3. fail
 */

function speedRating(path, cmp) {
    //let during = cache.getDuring(path)

    //if(!during) return 1

    /*
    switch(true) {
    case Math.abs(during - cmp)
    }
    */

}

/**
 * 
cache = {
  "to/path": during
}
 */
class CollecterCache {
    constructor() {
	this.cache = {}
    }
    getDuring(path) {
	return this.cache[path]
    }
    setCache(path, during) {
	this.cache[path] = during
	return this
    }
    removeCache(path) {
	delete this.cache[path]
	return this
    }
    clearCache() {
	this.cache = {}
	return this
    }
}

export default class Collecter {
    constructor(env, flag) {
	this.flag = flag
        this.during = 0
	this.env = env
    }
    start(file) {
	const now = Date.now()
        this.during = now
	this.filepath = file.path
	file.beginAt = now
        return this
    }
    end(file) {
	const path = file.path
	const during = Date.now() - file.beginAt
	
	if(isSourceMapFile(path)) return this
	
        drawCollect(this.flag, during, relative(resolve(this.env.tmp), path))
	
        return this
    }
}
