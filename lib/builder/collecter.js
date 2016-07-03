import { drawCollect } from './log'

export default class Collecter {
    constructor(flag) {
	this.flag = flag
        this.during = 0
    }
    start(done) {
        this.during = Date.now()
        done && done()
        return this
    }
    end(done) {
        drawCollect(this.flag, Date.now() - this.during)
        done && done()
        return this
    }
}
