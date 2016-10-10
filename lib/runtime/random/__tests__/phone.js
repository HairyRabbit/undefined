// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../phone')

import phone from './../phone'

describe('random/phone', () => {
  it('basic phone', () => {
    expect(
      String(phone()).length
    ).toBe(11)
  })
})
