// -*- mode: js2 -*-
// -*- coding: utf8 -*-
// @flow


/**
 * RabbitForwardFindFile
 *
 * Used for find the `rabbit.json` config file.
 *
 * @author Rabbit
 */



import fs from 'fs'
import path from 'path'
import { lte, pipe, curry, repeat, join } from 'ramda'
import { Maybe } from 'ramda-fantasy'


const { Just, Nothing } = Maybe


/**
 * makeRelativePath
 *
 * Make relative paht `../`
 *
 * @example
 * ```js
 * makeRelativePath(0) //=> Nothing
 * makeRelativePath(1) //=> Just '../'
 * makeRelativePath(2) //=> Just '../../'
 * ```
 *
 * @function
 * @private
 * @pointfree
 *
 * @param {number} number
 * @return {string}
 */
function makeRelativePath(num: number): Maybe<string> {
  let _fx: (n: number) => string = pipe(repeat('../'), join(''))
  console.log(Just(1).ap(console.log))
  return lte(1, num) ? Just(_fx(num)) : Nothing()
}

const test: Maybe<string> = makeRelativePath(1)




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
 
export const replacePath = curry((depth, filename, filepath) => {
  //return path.join(filepath, relativePathDepth(depth), filename)
})



export const forwardPath = replacePath(2)
export const currentDirFile = replacePath(1)

*/


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
 * @sig String -> String -> String -> Maybe String
 *
 * @param {String} filename
 * @param {String} root
 * @param {String} filepath
 * @return {Maybe String}
 

const forwardSearchFilePath = curry(function(filename: string, root: string, filepath: string) {

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
*/
