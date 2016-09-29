// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../repeat')

import repeat from './../repeat'

describe('repeat module', () => {
  it('repeat', () => {
    expect(
      repeat(3, 'foo')
    ).toBe('foofoofoo')
  })
})
