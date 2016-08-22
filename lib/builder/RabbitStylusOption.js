/**
 * @fileOverview
 * @name RabbitStylusOption.js
 * @author
 * @license
 */
import path from 'path'
import { curry } from 'ramda'
import RabbitStylusMergePlugins from './RabbitStylusMergePlugins.js'
import RabbitStylusDefine from './RabbitStylusDefine.js'
import RabbitStylusUtilLoader from './RabbitStylusUtilLoader.js'


const RabbitStylusOption = (env) => {
  return {
	  include: env.paths,
    use: RabbitStylusMergePlugins({
      root: process.cwd(),
      filename: 'rabbit.json'
    }, [
      RabbitStylusDefine,
      RabbitStylusUtilLoader
    ])
  }
}


export default RabbitStylusOption
