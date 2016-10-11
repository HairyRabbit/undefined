// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../string')

import string from './../string'

describe('random/string', () => {
  it('generate a random length string', () => {
    expect(
      string().length > 0
    ).toBe(true)
  })

  it('max length', () => {
    expect(
      string({ max: 10 }).length <= 10
    ).toBe(true)
  })

  it('min length', () => {
    expect(
      string({ min: 3 }).length >= 3
    ).toBe(true)
  })

  it('replace \\d+', () => {
    let regex = /foo\d+/;
    console.log(string({ pattern: regex }))
    expect(
      regex.test(string({ pattern: regex }))
    ).toBe(true)
  })

  it('with a pattern', () => {
    let regex = /foo\d+bar\d{1,2}\w+baz\w{,5}42\w{3,}/;
    console.log(string({ pattern: regex }))
    expect(
      regex.test(string({ pattern: regex }))
    ).toBe(true)
  })
})
