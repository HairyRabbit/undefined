// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../number')
jest.unmock('./../string')
jest.unmock('./../boolean')
jest.unmock('./../name')
jest.unmock('./../age')
jest.unmock('./../sex')
jest.unmock('./../qq')
jest.unmock('./../phone')
jest.unmock('./../email')

import number from './../number'
import string from './../string'
import boolean from './../boolean'
import name from './../name'
import age from './../age'
import sex from './../sex'
import qq from './../qq'
import phone from './../phone'
import email from './../email'

describe('random/number', () => {
  it('test schema', () => {

    console.log(
      {
        id: string({ len: 10 }),
        name: name({ lang: 'zh' }),
        age: age({ nonage: true }),
        sex: sex({ zh: true }),
        qq: qq(),
        phone: phone(),
        email: email()
      }
    )

    expect(
      true
    ).toBe(true)
  })
})
