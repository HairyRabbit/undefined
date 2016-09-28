// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../uppercase')

import uppercase from './../uppercase'

describe('uppercase module', () => {
  it('uppercase', () => {
    expect(
      uppercase('foo')
    ).toBe('FOO')
  })
})
