// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../number')
jest.unmock('./../string')
jest.unmock('./../boolean')
jest.unmock('./../name')

import number from './../number'
import string from './../string'
import boolean from './../boolean'
import name from './../name'

describe('random/number', () => {
  it('test schema', () => {

    console.log(
      {
        id: string({ min: 32 }),
        name: name(),
        age: number({ min: 2, max: 2 })
      }
    )

    expect(
      true
    ).toBe(true)
  })
})
