// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../search')

import search from './../search'

describe('search module', () => {
  it('search', () => {
    expect(
      search('foo-bar-baz', /-/)
    ).toBe(3)
  })
})
