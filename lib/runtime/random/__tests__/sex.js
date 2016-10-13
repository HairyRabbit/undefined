// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../sex')

import sex from './../sex'

describe('random/sex', () => {
  it('sex should be male fmale or a secret', () => {
    expect(
      sex()
    ).toMatch(/male|fmale|secret/)
  })

  it('not null', () => {
    expect(
      sex({ nn: true })
    ).toMatch(/male|fmale/)
  })

  it('i18n', () => {
    expect(
      sex({ zh: true })
    ).toMatch(/男|女|保密/)
  })

  /*
  it('custom', () => {
    expect(
      sex({ custom: [''] })
    ).toBe('男' || '女')
  })
  */
})
