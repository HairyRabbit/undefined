// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../uppercase')
jest.unmock('./../lowercase')

import uppercase from './../uppercase'
import lowercase from './../lowercase'

describe('uppercase module', () => {
  it('uppercase', () => {
    expect(
      uppercase('FOO')
    ).toBe(true)
  })

  it('uppercase, failed', () => {
    expect(
      uppercase('Foo')
    ).toBe(false)
  })
})

describe('lowercase module', () => {
  it('lowercase', () => {
    expect(
      lowercase('foo')
    ).toBe(true)
  })

  it('lowercase, failed', () => {
    expect(
      lowercase('FoO')
    ).toBe(false)
  })
})
