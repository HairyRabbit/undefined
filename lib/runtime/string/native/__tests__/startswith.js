// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../startswith')

import startswith from './../startswith'

describe('startswith module', () => {
  it('startswith', () => {
    expect(
      startswith('foobar', 'foo')
    ).toBe(true)
  })

  it('startswith, with position', () => {
    expect(
      startswith('foobar', 'foo', 1)
    ).toBe(false)
  })
})
