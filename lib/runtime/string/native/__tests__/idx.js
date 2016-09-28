// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../idx')

import idx, { idxr } from './../idx'

describe('idx module', () => {
  it('idx', () => {
    expect(
      idx('foo', 'f')
    ).toBe(0)
  })
  it('idx, with from', () => {
    expect(
      idx('foobarfoo', 'o', 3)
    ).toBe(7)
  })
  it('idxr', () => {
    expect(
      idxr('foo', 'o')
    ).toBe(2)
  })
  it('idxr, with from', () => {
    expect(
      idxr('foobarfoo', 'o', 6)
    ).toBe(2)
  })
})
