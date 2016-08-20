/**
 *
 */


import { curry } from 'ramda'


const RabbitStylusENVKey = 'rabbit'
const RabbitStylusENVDefaultOption = {
  environment: 'development'
}


function _RabbitStylusDefineENV(env, render) {
  let opts = Object.assign({}, env, RabbitStylusENVDefaultOption)

  render[RabbitStylusENVKey] = opts
}

export default curry(_RabbitStylusDefineENV)
