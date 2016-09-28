// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../split')

import split from './../split'

describe('split module', () => {
  it('split, with regexp', () => {
    expect(
      split('foo-bar-baz', /-/)
    ).toEqual(['foo', 'bar', 'baz'])
  })

  it('split, with string', () => {
    expect(
      split('foo-bar-baz', 'foo')
    ).toEqual(['', '-bar-baz'])
  })
})
