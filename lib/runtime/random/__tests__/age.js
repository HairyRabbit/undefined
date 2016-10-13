// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../number')
jest.unmock('./../age')

import age from './../age'

describe('random/age', () => {
  it('random age in scope 12 - 45', () => {
    let a = age()
    expect(
      12 < a && a < 45
    ).toBe(true)
  })

  it('nonage', () => {
    let a = age({ nonage: true })
    expect(
      a < 18
    ).toBe(true)
  })

})
