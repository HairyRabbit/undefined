// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../replace')

import replace from './../replace'

describe('replace module', () => {
  it('replace', () => {
    expect(
      replace('foo-bar-baz', /bar/, 'foo')
    ).toEqual('foo-foo-baz')
  })
})
