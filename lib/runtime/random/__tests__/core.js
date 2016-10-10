// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')

import { randomNumber, randomLength, randomString, randomListItem } from './../core'

describe('random/core', () => {
  it('generate a random number', () => {
    expect(
      randomNumber(10)
    ).toBeLessThan(10)
  })

  it('random number in scope', () => {
    let out = randomNumber(10, 20)
    expect(
      out >= 10 && out < 20
    ).toBe(true)
  })

  it('random length number', () => {
    let out = randomLength(10)
    expect(
      String(out).length
    ).toBe(10)
  })

  it('random string', () => {
    let out = randomString(5)
    expect(
      out.length === 5
    ).toBe(true)
  })

  it('random list item', () => {
    let list = [ 1, 2, 3 ]
    expect(
      list.includes(randomListItem(list))
    ).toBe(true)
  })
})
