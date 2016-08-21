/**
 *
 */


import RabbitForwardFindFile from './RabbitForwardFindFile.js'

export const RabbitStylusDefineKey = 'rabbit'

const RabbitStylusDefine = (config = {}) => (render = {}) => {
  render[RabbitStylusDefineKey] = config
}

export default RabbitStylusDefine
