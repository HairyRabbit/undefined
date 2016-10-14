// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../parser')

import parser from './../parser'

describe('random/parser', () => {
  it('parse url to options', () => {
    expect(
      parser('age|nonage,min=16,max=20')
    ).toBe(true)
  })
})
