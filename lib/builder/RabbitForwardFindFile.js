/**
 *
 */

import fs from 'fs'
import path from 'path'
import { pipe, curry, repeat, join } from 'ramda'


const relativePathDepth = pipe(repeat('../'), join(''))
const replacePath = curry(_replacePath)
const forwardPath = replacePath(2)
const currentDirFile = replacePath(1)
const isRootPath = curry(_isRootPath)


function _replacePath(depth, filename, filepath) {
  return path.join(filepath, relativePathDepth(depth), filename)
}

function _isRootPath(root, filepath) {
  return path.relative(filepath, root) === ''
}


function forwardSearchFilePath(filename, root, filepath) {
  let isRootPathFn = isRootPath(root)
  let forwardPathFn = forwardPath(filename)
  let currentDirFileFn = currentDirFile(filename)

  return (function recur(searchPath) {

    if(isRootPathFn(searchPath) || fs.existsSync(searchPath))
      return searchPath

    return recur(forwardPath(searchPath))
  })(currentDirFileFn(filepath))
}


export default forwardSearchFilePath
