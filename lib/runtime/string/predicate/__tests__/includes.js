// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../includes')

import includes from './../includes'

describe('includes module', () => {
  it('includes', () => {
    expect(
      includes('foo', 'foobar')
    ).toBe(true)
  })

  it('includes, failed', () => {
    expect(
      includes('baz', 'foobar')
    ).toBe(false)
  })
})
