import chalk from 'chalk'
import path from 'path'

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
const DoneIc  = '\u25cf'
const Result_Err = '\u03c7'
const ErrIc = '\u03c7'


const {
  bgRed, bgBlue, bgGreen,
  bgYellow, bgCyan, bgMagenta,
  gray, red, blue, green,
  yellow, cyan, magenta,
  bold
} = chalk

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
function pad(len, f = ' ') {
  return Array(len).fill(f).join('')
}

const padRight = (len) => (str) => {
  return str + pad(len - str.length)
}

const pad20 = padRight(20)
const pad30 = padRight(30)
const pad40 = padRight(40)
const pad45 = padRight(45)
const pad50 = padRight(50)

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

function padSpace(content) {
  return ` ${content} `
}
function wrap(str) {
  return function(content) {
	  return `${str}${content}${str}`
  }
}
/**
 * Faces.
 */

function drawLabel(content, bg, max = null) {
  return bg(bold(wrap(' ')(content.toUpperCase())))
}

const labelErrIc = red(bold(ErrIc))
const labelErr = drawLabel('error', bgRed)
const labelCSS = drawLabel('css', bgBlue)
const labelHTML = drawLabel('html', bgGreen)
const labelJS = drawLabel('javascript', bgYellow)

export function drawErrFlag() {
  return `
${pad(20)}${labelErr}
`
}

export function drawErrLine(content) {
  return `${labelErrIc} ${content}`
}

export function drawErrFile(content) {
  return drawErrLine(content)
}

export function drawErrPos(pos) {
  return drawErrLine(`line ${blue(pos[0])}, column ${blue(pos[1])}`)
}

export function drawErrMsg(content) {
  return wrap('\n')(content)
}

export function label(str, color) {
  return [gray('<'), color(str.toUpperCase()), gray('>')].join(' ')
}

let hello = 'Hi. I\'m Rabbit!'

const draw = (flag, color) => (...content) => {
  console.log.apply(
	  null,
	  [].concat(pad45(label(flag, color))).concat(content)
  )
}

export function drawGreet(str) {
  // @todo happy build with rabbit
  draw('Hello', magenta)(
	  cyan(DoneIc),
	  hello
  )
}

export function drawCollect(flag, during, content = '') {
  let timing = fmtTime(during)
  
  draw(flag, blue)(
	  green(DoneIc),
	  pad30(`${timing[0]} ${magenta(timing[1])}`),
	  gray(content)
  )
}

export function drawWebpackCollect(flag, during, content = '') {
  let timing = fmtTime(during)
  
  draw(flag, yellow)(
	  green(DoneIc),
	  pad30(`${timing[0]} ${magenta(timing[1])}`),
	  gray(content)
  )
}

export function drawDllBlackListInfo(names) {
  draw('vendor', yellow)(
    red(DoneIc),
    `${red(names.join(' '))} can't resolved, joined the dll black list.`
  )
}

export function drawDllDepsChanged({ action, data }) {
  draw('vendor', yellow)(
    red(DoneIc),
    `${(data.join(' '))} ${action}, you need rebuild later.`
  )
}


class ShowError {
  constructor(type, file, pos, content) {
	  this.type    = type
	  this.file    = file
	  this.pos     = pos
	  this.content = content
	  
	  this.init()
  }
  init() {
	  console.log(drawErrFlag())
	  console.log(drawErrLine(this.type))
	  if(this.file)
	    console.log(drawErrFile(this.file))
	  if(this.pos)
	    console.log(drawErrPos(this.pos))
	  console.log(drawErrMsg(this.content))
  }
}

export function fmtError(type, err, evt) {
  switch(type) {
  case 'styl':
	  var pinfo = err.message.split('\n')[0]
	  var idx = pinfo.indexOf('styl') + 4
	  var file = path.relative(process.cwd(), path.normalize(pinfo.slice(0, idx)))
	  var pos = pinfo.slice(idx + 1).split(':')
	  return new ShowError(labelCSS, file, pos, err.message)
  case 'html':
	  var file = path.relative(process.cwd(), path.normalize(err.fileName))
	  var pos = err.message.match(/\[Line\s?(\d+),\s?Column\s?(\d+)\]/)

    evt.emit('GetLocateError', path.normalize(err.fileName), pos[1], pos[2])
    
	  return new ShowError(labelHTML, file, (pos ? [pos[1], pos[2]] : ''), err.message)
  case 'js':
	  return new ShowError(labelJS, '', '', err.join('\n'))
  default:
	  throw new Error('Undefined type')
  }
}



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
  out += labelErr
  out += '\n'
  out += defineFaceResultErr()
  out += ' '
  out += labelStylus
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

export const exports = {
  
}
