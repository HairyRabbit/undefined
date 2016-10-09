// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../trim')

import trim, { triml, trimr } from './../trim'

describe('trim module', () => {
  it('trim', () => {
    expect(
      trim(' foo ')
    ).toBe('foo')
  })

  it('trim, trim whitespace', () => {
    expect(
      trim(' ')
    ).toBe('')
  })

  it('triml', () => {
    expect(
      triml('  foo ')
    ).toBe('foo ')
  })

  it('trimr', () => {
    expect(
      trimr(' foo  ')
    ).toBe(' foo')
  })
})
