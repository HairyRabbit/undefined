// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')

import { randomNumber } from './../core'

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
})
