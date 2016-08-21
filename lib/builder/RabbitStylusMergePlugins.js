/**
 *
 */

import fs from 'fs'
import { curry, memoize } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import RabbitForwardFindFile from './RabbitForwardFindFile.js'

const { Just, Nothing } = Maybe

const RabbitProjectConfigFileCache = {}


/**
 *
 * @param {String} filepath
 * @return {Maybe String}
 */
function readJSONFile(filepath) {
  try {
    return Just(
      JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    )
  } catch(e) {
    return Nothing()
  }
}


const RabbitStylusMergePlugins = (options = {}, plugins = []) => render => {
  const filepath = render.options.filename

  let { root, filename } = options
  let config = RabbitForwardFindFile(filename, root, filepath)
      .chain(readJSONFile).getOrElse({})

  plugins.forEach(n => n(config)(render))
}

function RabbitStylusMergeTransformPlugins() {

}


export default RabbitStylusMergePlugins



