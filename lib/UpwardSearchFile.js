// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Builder UpwardSearchFile
 *
 * Used for find the `rabbit.json` config file.
 *
 * @author Rabbit
 *
 */



import Fs from 'fs'
import Path from 'path'
import {
  gte,
  isEmpty,
  memoize,
  pipe,
  curry,
  repeat,
  join
} from 'ramda'



/**
 * upwardPath
 *
 * Upward relative paht.
 *
 * @example
 * ```js
 * upwardPath(1) //=> '../'
 * upwardPath(2) //=> '../../'
 * ```
 *
 * @function
 * @private
 * @pointfree
 */
const upwardPath = pipe(
  repeat('../'), join('')
)




/**
 * replacePath
 *
 * Replace current file path.
 *
 * @example
 * ```js
 * replacePath(1, 'foo.bar', 'path/from/to/bar.baz') //=> 'path/from/to/foo.bar'
 * replacePath(2, 'foo.bar', 'path/from/to/bar.baz') //=> 'path/from/foo.bar'
 * ```
 *
 * @function
 * @private
 *
 * @param {Number} depth
 * @param {String} filename
 * @param {String} filepath
 * @return {String}
 */
const replacePath = curry(function replacePath(depth, name, path) {
  return Path.join(path, upwardPath(depth), name)
})

const pathDepth1 = replacePath(1)
const pathDepth2 = replacePath(2)





/**
 * isRootPath
 *
 * Test filepath isnot the root dir.
 *
 * @function
 * @private
 * @pointfree
 *
 * @param {String} root - root must be a dir && path must be a filepath
  * @return {Boolean}
 */
const pathRelative = curry(function pathRelative(a, b) {
  return Path.relative(a, b)
})

const isRootPath = curry(function isRootPath(root) {
  return pipe(
    Path.dirname,
    pathRelative(root),
    isEmpty
  )
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
 */

const fsExist = Fs.existsSync

const upwardSearch = curry(function(opts, path) {

  let { root, name } = opts

  let irp = isRootPath(root)
  let pd1 = pathDepth1(name)
  let pd2 = pathDepth2(name)

  return (function recur(out) {

    if(fsExist(out)) return out
    if(irp(out)) return ''

    return recur(pd2(out))

  })(pd1(path))
})



/**
 * getContent
 *
 * @function
 * @pointfree
 *
 * @return {string}
 */
const getContent = curry(function getContent(fx, root, name) {
  return pipe(
    upwardSearch(name, root),
    defaultTo(fx(name, root))
  )
})


const fsRdFile = memoize(function fsRdFile(path) {
  return JSON.parse(Fs.readFileSync(path, 'utf-8'))
})



export default getContent
