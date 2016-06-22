'use strict'

const chalk = require('chalk')

/**
 * Logger util.
 *
 * Used for Gulp task or ...
 * Just server side.
 *
 * @private
 */


// used for pad flag str.
const flagPad = 2
// used reset workspace width.
// @fixme
const workspaceLen = 15
const FlagRight  = '\u25ba'
const Result_Ok  = '\u25cf' //'\u221a'
const Result_Err = '\u03c7'


/**
 * Flag.
 *
 * Used for display task type.
 *
 * @Class
 * @private
 * @param {String} flag
 * @param {String} color
 */
class Flag {
    constructor(flag, color) {
	this.flag  = flag
	this.color = color
    }
    toStr() {
	let bg = chalk['bg' + replaceFstChar(this.color)]
	return bg(chalk.bold((this.flag)))// + chalk[this.color]('\u25ba')
    }
}

const Flag_WrokSpace = new Flag('WorkSpace', 'magenta')
const Flag_CSS       = new Flag('CSS ', 'blue')
const Flag_HTML      = new Flag('HTML', 'green')
const Flag_JS        = new Flag('JavaScript', 'yellow')
const Flag_IMAGE     = new Flag('IMAGE ', 'red')
const Flag_FONT      = new Flag('FONT ', 'red')
const Flag_File      = new Flag('File', 'red')
const Flag_BS        = new Flag('Browser', 'cyan')
const Flag_API       = new Flag('API ', 'cyan')

// compute max string length.
const flagMaxLen = (() => {
    return [
	Flag_WrokSpace,
	Flag_CSS,
	Flag_HTML,
	Flag_JS,
	Flag_IMAGE,
	Flag_FONT,
	Flag_File,
	Flag_BS,
	Flag_API
    ].reduce((acc, curr) => Math.max(acc, curr.flag.length), 0) + flagPad
})()

// normalize the flag content.
const flag = normalizeFlags({
    workspace: Flag_WrokSpace,
    css: Flag_CSS,
    html: Flag_HTML,
    js: Flag_JS,
    image: Flag_IMAGE,
    font: Flag_FONT,
    file: Flag_File,
    browser: Flag_BS,
    api: Flag_API
})



/**
 * Utils.
 */


/**
 * Replace string first char.
 *
 * @example
 * replaceFstChar('abc') //=> 'Abc'
 *
 * @param {String} str
 * @return {String}
 */
function replaceFstChar(str) {
    return str.replace(/(\w)(\w+)/, (_, a, b) => a.toUpperCase() + b)
}

/**
 * Replace string first char.
 *
 * @example
 * pad('abc') //=> 'Abc'
 *
 * @param {Number} len
 * @param {String} f
 * @return {String}
 */
function pad(len, f) {
    return Array(len).fill(f || ' ').join('')
}

/**
 * Center the flag string.
 *
 * @private
 *
 * @param {Number} max
 * @param {Flag} flag
 * @return {String}
 */
function flagPadCenter(max) {
    return function(flag) {
	var content = flag.flag
	var space = max - content.length
	var left = Math.ceil(space / 2)
	return pad(left) + content + pad(space - left)
    }
}

/**
 * Rewrite flag string.
 *
 * @private
 * @effects
 *
 * @requrie flagMaxLen
 *
 * @param {Flag} flag
 * @return {Flag}
 */
function normalizeFlags(flags) {
    const nor = flagPadCenter(flagMaxLen)
    for(let k in flags) {
	flags[k].flag = nor(flags[k])
    }
    return flags
}

/**
 * Format Date time
 *
 * @param {Number} time - timestamp
 * @return {[String, String]}
 */
function fmtTime(time) {
    return time < 1000 ? [time.toString(), 'ms'] : [(time / 1000).toString(), 's']
}

/**
 * Faces.
 */


function defineFaceWorkspace(workspace) {
    let len  = workspace ? workspace.length : 'all'.length
    let padw = len < workspaceLen ? pad(workspaceLen - len) : ''
    
    return chalk.gray('{') + chalk.magenta(workspace || 'all') + chalk.gray('}') + padw
}

function defineFaceTime(time) {
    let timef = fmtTime(time)
    return chalk.bold(chalk.blue(timef[0])) + ' ' + chalk.gray(timef[1])
}

function defineFaceThen() {
    return chalk.gray(' >>= ')
}

function defineFaceFile(file) {
    return chalk.green(file)
}

function defineFaceResultOk() {
    return chalk.green(Result_Ok)
}

function defineFaceResultErr() {
    return chalk.red(Result_Err)
}

/**
 * Logger.
 */
function log(f, content) {
    if(f && f instanceof Flag) {
	const arg = [].slice.call(arguments, 1)
	process.nextTick(() => {
	    console.log.apply(null, [].concat(f.toStr()).concat(arg))
	})
    } else {
	console.log.apply(null, [].slice.call(arguments))
    }
}

function logWorkSpace(workspace) {
    let out = ''
    out += 'SwitchTo '
    out += defineFaceWorkspace(workspace)
    //out += '\n'
    return log(flag.workspace, out)
}

function logCSS(workspace, file, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    out += '\t'
    out += defineFaceFile(file)
    //out += '\n'
    return log(flag.css, out)
}

function logHTML(workspace, file, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    out += '\t'
    out += defineFaceFile(file)
    //out += '\n'
    return log(flag.html, out)
}

function logJs(workspace, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    //out += '\n'
    return log(flag.js, out)
}

function logImage(workspace, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    //out += '\n'
    return log(flag.image, out)
}

function logFont(workspace, during) {
    let out = ''
    out += 'ReBuild  '
    out += defineFaceWorkspace(workspace)
    out += defineFaceTime(during)
    //out += '\n'
    return log(flag.font, out)
}

function logFile(file) {
    let out = ''
    out += 'Changed '
    out += file
    out += defineFaceThen()
    out += 'ReBuild...'
    return log(flag.file, out)
}

function logBrowser(workspace, info) {
    let out = ''
    out += 'ServerOn '
    //out += defineFaceWorkspace(workspace)
    out += info
    //out += '\n'
    return log(flag.browser, out)
}

function logAPI(workspace, info) {
    let out = ''
    out += 'ServerOn '
    //out += defineFaceWorkspace(workspace)
    out += info
    //out += '\n'
    return log(flag.api, out)
}

function logErrFlag(task) {
    let out = ''
    out += '\n'
    out += pad(20)
    out += chalk.bgRed(chalk.bold(' ERROR '))
    out += '\n'
    out += defineFaceResultErr()
    out += ' '
    out += task.toUpperCase()
    out += ' '
    out += 'build err'
    return log(out)
}

function logErrFile(file) {
    let out = ''
    out += defineFaceResultErr()
    out += ' '
    out += file
    return log(out)
}

function logErrPosition(line, col) {
    let out = ''
    out += defineFaceResultErr()
    out += ' '
    out += 'on line '
    out += chalk.yellow(line)
    out += ' '
    out += 'column '
    out += chalk.yellow(col)
    return log(out)
}

function logApiRequest() {
    let out = ''
    //out += '\n'
    //out += pad(20) + chalk.bgCyan(chalk.bold(' API REQUEST ')) + '\n'
    out += ':method :url :status :response-time ms - :res[content-length] \n'
    return out
}

function logApiResponse() {

}

function logNewLine() {
    return log('\n')
}

/**
 * Exports
 */

module.exports = {
    flag: flag,
    pad: pad,
    say: log,
    log: {
	workspace: logWorkSpace,
	css: logCSS,
	html: logHTML,
	js: logJs,
	image: logImage,
	font: logFont,
	file: logFile,
	browser: logBrowser,
	api: logAPI,
	errFlag: logErrFlag,
	errFile: logErrFile,
	errPos: logErrPosition,
	apiReq: logApiRequest,
	n: logNewLine
    }
}
