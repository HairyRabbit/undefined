export default (opts) => (predicate) => {
    let timer = null
    let count = 0
    let now = Date.now()
    
    const defaultOptions = {
	interval: 1000,
	times: 0,
	timeout: 5000
    }
    let { interval, times, timeout } = Object.assign({}, defaultOptions, opts)

    return new Promise((res, rej) => {
	timer = setInterval(_ => {
	    if(predicate()) {
		clearInterval(timer)
		return res()
	    }

	    if(times > 0 && count >= times) {
		clearInterval(timer)
		return rej()
	    }

	    if(times === 0 && timeout && Date.now() - now >= timeout) {
		clearInterval(timer)
		return rej()
	    }

	    count = count + 1
	}, interval)
    })
}
