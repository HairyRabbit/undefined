// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../count')

import count from './../count'

describe('count module', () => {
  it('count', () => {
    expect(
      count('foo')
    ).toBe(3)
  })
})
