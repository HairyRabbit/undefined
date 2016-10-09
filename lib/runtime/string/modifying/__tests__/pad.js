// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../../building/repeat')
jest.unmock('./../../building/fill')
jest.unmock('./../pad')

import pad, { padl, padr } from './../pad'

describe('pad module', () => {
  it('pad', () => {
    expect(
      pad(8, 'foo')
    ).toBe('  foo   ')
  })

  it('padl', () => {
    expect(
      padl(5, 'foo')
    ).toBe('  foo')
  })

  it('padr', () => {
    expect(
      padr(5, 'foo')
    ).toBe('foo  ')
  })
})
