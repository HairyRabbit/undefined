// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../count')
jest.unmock('./../substr')
jest.unmock('./../char')

import { count }  from './../count'
import { substr } from './../substr'
import { char, charcode, fromcharcode } from './../char'

describe('string.property', () => {
  it('count', () => {
    expect(
      count('foo')
    ).toBe(3)
  })
})

describe('string.prototype', () => {
  it('substr', () => {
    expect(
      substr('foo', -1)
    ).toBe('o')
  })

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
