jest.unmock('../RabbitStylusDefine.js')
jest.unmock('ramda')
jest.unmock('stylus/lib/renderer.js')

import path from 'path'
import RabbitStylusDefine, { RabbitStylusDefineKey } from '../RabbitStylusDefine.js'
import Renderer from 'stylus/lib/renderer.js'
import { merge, objOf } from 'ramda'


describe('Rabbit Stylus Define Plugin', () => {

  it('a simple test', () => {
    let config = { test: 'test' }
    let render = {}
    let output = { rabbit: { test: 'test' } }
    RabbitStylusDefine(config, render)

    expect(render).toEqual(output)
  })

  it('a real world merge with Stylus Renderer object', () => {
    let config = require(path.resolve('rabbit.json'))
    let render = new Renderer('')
    RabbitStylusDefine(config, render)

    expect(render).toEqual(
      merge(render, objOf(RabbitStylusDefineKey, config))
    )
  })
})
