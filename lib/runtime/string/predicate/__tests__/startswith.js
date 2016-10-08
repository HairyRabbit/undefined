// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../startswith')
jest.unmock('./../endswith')

import startswith from './../startswith'
import endswith from './../endswith'

describe('startswith module', () => {
  it('startswith', () => {
    expect(
      startswith('-webkit-', '-webkit-transition')
    ).toBe(true)
  })

  it('startswith, failed', () => {
    expect(
      startswith('-webkit-', '-ms-transition')
    ).toBe(false)
  })
})


describe('endswith module', () => {
  it('endswith', () => {
    expect(
      endswith('bar', 'foobar')
    ).toBe(true)
  })

  it('endswith', () => {
    expect(
      endswith('baz', 'foobar')
    ).toBe(false)
  })
})
