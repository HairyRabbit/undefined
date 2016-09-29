// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../pad')

import { padl, padr } from './../pad'

describe('pad module', () => {
  it('padl', () => {
    expect(
      padl(4, 'foo')
    ).toBe(' foo')
  })

  it('padr', () => {
    expect(
      padr(4, 'foo')
    ).toBe('foo ')
  })
})
