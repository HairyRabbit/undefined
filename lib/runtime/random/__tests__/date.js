// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../date')

import date from './../date'

describe('random/date', () => {
  it('basic date', () => {
    expect(
      date()
    ).toMatch(/\d{4}-\d{2}-\d{2}/)
  })
})
