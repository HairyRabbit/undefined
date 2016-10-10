// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../name')

import name from './../name'

describe('random/name', () => {
  it('basic name', () => {
    expect(
      name()
    ).toBeTruthy()
  })

  it('a fmale english name', () => {
    expect(
      name({ sex: 'f' })
    ).toBeTruthy()
  })

  it('a chinese name', () => {
    expect(
      name({ lang: 'zh' })
    ).toBeTruthy()
  })

  it('lastname only', () => {
    expect(
      name({ last: true })
    ).toBeTruthy()
  })

  it('custom format', () => {
    function format({ firstName, lastName }) {
      return firstName + '-' + lastName
    }
    const regex = /[a-zA-Z]+-[a-zA-Z]+/;
    expect(
      regex.test(name({ format: format }))
    ).toBe(true)
  })
})

/*
for(let i = 0; i < 100; i++) {
  console.log(
    name({ isChinese: true, whitespace: false, sex: 'f' })
  )
}
*/
