// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../substr')

import substr from './../substr'

describe('substr module', () => {
  it('substr', () => {
    expect(
      substr('foo', -1)
    ).toBe('o')
  })
})
