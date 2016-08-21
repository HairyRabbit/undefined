
import path from 'path'
import { bind } from 'ramda'
import RabbitStylusMergePlugins from './RabbitStylusMergePlugins.js'
import RabbitStylusDefine from './RabbitStylusDefine.js'
import RabbitStylusUtilLoader from './RabbitStylusUtilLoader.js'



const RabbitStylusOption = (env) => {
  return {
	  include: env.paths,
    /*
	  use: [
      RabbitStylusDefine(),
      RabbitStylusUtilLoadre
    ]
    */
    use: RabbitStylusMergePlugins({
      root: process.cwd(),
      filename: 'rabbit.json'
    }, [
      RabbitStylusDefine,
      RabbitStylusUtilLoader
    ])
  }
}


export default bind(RabbitStylusOption, RabbitStylusOption)
