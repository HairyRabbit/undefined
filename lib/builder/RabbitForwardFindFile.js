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



export const relativePathDepth = pipe(
  repeat('../'),
  join('')
)


/**
 * replacePath
 *
 * Replace current file path.
 *
 * @function
 * @private
 *
 * @param {Number} depth
 * @param {String} filename
 * @param {String} filepath
 * @return {String}
 */
export const replacePath = curry((depth, filename, filepath) => {
  return path.join(filepath, relativePathDepth(depth), filename)
})


export const forwardPath = replacePath(2)
export const currentDirFile = replacePath(1)




/**
 * isRootPath
 *
 * Test filepath isnot root dir.
 *
 * @function
 * @private
 *
 * @param {String} root
 * @param {String} filepath
 * @return {Boolean}
 */
export const isRootPath = curry((root, filepath) => {
  return path.relative(path.dirname(filepath), root) === ''
})



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
 * @function
 *
 * @param {String} filename
 * @param {String} root
 * @param {String} filepath
 * @return {Maybe String}
 */

const forwardSearchFilePath = curry((filename, root, filepath) => {

  const { Just, Nothing } = Maybe
  let isRootPath1 = isRootPath(root)
  let forwardPath1 = forwardPath(filename)
  let currentDirFile1 = currentDirFile(filename)

  return (function recur(searchPath) {

    if(fs.existsSync(searchPath)) return Just(searchPath)
    if(isRootPath1(searchPath)) return Nothing()

    return recur(forwardPath1(searchPath))

  })(currentDirFile1(filepath))
})


export default forwardSearchFilePath
