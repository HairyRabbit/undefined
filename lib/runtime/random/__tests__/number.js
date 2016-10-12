// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../number')

import number from './../number'

describe('random/number', () => {
  it('generate a random length number', () => {
    expect(
      number().length > 0
    ).toBe(true)
  })

  it('max length', () => {
    expect(
      number({ max: 10 }).length <= 10
    ).toBe(true)
  })

  it('min length', () => {
    expect(
      number({ min: 3 }).length >= 3
    ).toBe(true)
  })

})
