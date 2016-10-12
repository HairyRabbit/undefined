// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../boolean')

import boolean from './../boolean'

describe('random/boolean', () => {
  it('generate true or false', () => {
    expect(
      boolean()
    ).toBe(true || false)
  })
})
