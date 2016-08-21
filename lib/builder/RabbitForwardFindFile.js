/**
 * RabbitForwardFindFile
 *
 * Used for find the `rabbit.json` config file.
 *
 * @author Rabbit
 */



import fs from 'fs'
import path from 'path'
import { pipe, curry, repeat, join } from 'ramda'
import { Maybe } from 'ramda-fantasy'


const { Just, Nothing } = Maybe

export const relativePathDepth = pipe(repeat('../'), join(''))

function _replacePath(depth, filename, filepath) {
  return path.join(filepath, relativePathDepth(depth), filename)
}

function _isRootPath(root, filepath) {
  return path.relative(path.dirname(filepath), root) === ''
}

const replacePath = curry(_replacePath)
export const forwardPath = replacePath(2)
export const currentDirFile = replacePath(1)
export const isRootPath = curry(_isRootPath)


/**
 * ForwardSearchFilePath
 *
 * The root is a dir path, not the root file. If call
 * forwardPath function is the `Root Dir Path`, checkout
 * the default options. If not, read file until the
 * <root> key is `true`.
 *
 * First step, check the current directory if the file
 * is exist. If not, check directory up one level.
 *
 * TODO maybe remove root key.
 *
 * @param {string} filename
 * @param {string} root
 * @param {string} filepath
 * @return {Maybe string}
 */

function forwardSearchFilePath(filename, root, filepath) {

  let isRootPathFn = isRootPath(root)
  let forwardPathFn = forwardPath(filename)
  let currentDirFileFn = currentDirFile(filename)

  return (function recur(searchPath) {

    if(fs.existsSync(searchPath)) return Just(searchPath)
    if(isRootPathFn(searchPath)) return Nothing()

    return recur(forwardPathFn(searchPath))

  })(currentDirFileFn(filepath))
}


export default curry(forwardSearchFilePath)
