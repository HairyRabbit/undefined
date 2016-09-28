// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../match')

import match from './../match'

describe('match module', () => {
  it('match', () => {
    let out = ['bar', 'r']
    out.index = 4
    out.input = 'foo-bar-baz'

    expect(
      match('foo-bar-baz', /ba(\w)/)
    ).toEqual(out)
  })

  it('match, with global flag', () => {
    expect(
      match('foo-bar-baz', /ba(\w)/g)
    ).toEqual(['bar', 'baz'])
  })

  it('match, not matched', () => {
    expect(
      match('foo-bar-baz', /abc/)
    ).toBeNull()
  })
})
