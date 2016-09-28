// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../lowercase')

import lowercase from './../lowercase'

describe('lowercase module', () => {
  it('lowercase', () => {
    expect(
      lowercase('FOOBAR')
    ).toBe('foobar')
  })
})
