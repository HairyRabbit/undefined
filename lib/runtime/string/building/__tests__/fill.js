// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../repeat')
jest.unmock('./../fill')

import fill from './../fill'

describe('fill module', () => {
  it('fill', () => {
    expect(
      fill(5, 'a')
    ).toBe('aaaaa')
  })

  it('fill, trun string', () => {
    expect(
      fill(5, 'abc')
    ).toBe('abcab')
  })
})
