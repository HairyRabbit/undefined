/* mode: js2 */
/* coding: utf-8 */


/**
 *
 */

import fs from 'fs'
import { curry, memoize } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import forwardSearch from './RabbitForwardFindFile.js'

const { Just, Nothing } = Maybe


/**
 * readFileContent
 *
 * @function
 * @private
 * @memoize
 * @sig readFileContent : String -> MaybeString
 *
 * @param {String} filepath
 * @return {Maybe String}
 */
const readFileContent = memoize(function readFileContent(filepath) {
  try {

    let result = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    return Just(result)

  } catch(e) {
    return Nothing()
  }
})



/**
 *
 * @function
 *
 * @
 */

const mergePlugins = curry((options, plugins, render) => {

  let filepath = render.get('filename')

  let { root, filename } = options

  let config = forwardSearch(filename, root, filepath)
      .chain(readFileContent).getOrElse({})

  plugins.forEach(n => n(config, render))
})




export default mergePlugins
