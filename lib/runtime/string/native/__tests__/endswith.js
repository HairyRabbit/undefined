// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../endswith')

import endswith from './../endswith'

describe('endswith module', () => {
  it('endswith', () => {
    expect(
      endswith('foobar', 'bar')
    ).toBe(true)
  })

  it('endswith, with position', () => {
    expect(
      endswith('foobar', 'bar', 'foobar'.length)
    ).toBe(true)
  })
})
