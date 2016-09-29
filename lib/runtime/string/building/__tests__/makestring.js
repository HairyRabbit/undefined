// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../makestring')

import makestring from './../makestring'

describe('makestring module', () => {
  it('makestring', () => {
    expect(
      makestring()
    ).toBe('')
  })
})
