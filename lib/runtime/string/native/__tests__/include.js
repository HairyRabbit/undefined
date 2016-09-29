// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../include')

import include from './../include'

describe('include module', () => {
  it('include', () => {
    expect(
      include('foo', 'f')
    ).toBe(true)
  })

  it('include, not matched', () => {
    expect(
      include('foo', 'b')
    ).toBe(false)
  })

  it('include, with position', () => {
    expect(
      include('foo', 'f', 1)
    ).toBe(false)
  })
})
