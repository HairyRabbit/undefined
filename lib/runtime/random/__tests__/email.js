// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../email')

import email from './../email'

describe('random/email', () => {
  it('basic email', () => {
    expect(
      email()
    ).toBeTruthy()
  })
})
