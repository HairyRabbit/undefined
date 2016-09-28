// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../char')

import char, { charcode, fromcharcode } from './../char'

describe('char module', () => {
  it('char', () => {
    expect(
      char('foo', 1)
    ).toBe('o')
  })

  it('charcode', () => {
    expect(
      charcode('abc', 0)
    ).toBe(97)
  })

  it('fromcharcode', () => {
    expect(
      fromcharcode(97, 98, 99)
    ).toBe('abc')
  })
})
