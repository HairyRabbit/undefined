/**
 * @file
 */

import { curry } from 'ramda'
import RabbitForwardFindFile from './RabbitForwardFindFile.js'

export const RabbitStylusDefineKey = 'rabbit'

const RabbitStylusDefine = curry((config, render) => {
  render.set(RabbitStylusDefineKey, config)
})

export default RabbitStylusDefine
