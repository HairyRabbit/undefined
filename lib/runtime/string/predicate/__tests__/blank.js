// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../../modifying/trim')
jest.unmock('./../blank')

import blank, { tblank, present, tpresent } from './../blank'

describe('blank module', () => {
  it('blank', () => {
    expect(
      blank('')
    ).toBe(true)
  })

  it('blank', () => {
    expect(
      blank(' ')
    ).toBe(false)
  })

  it('tblank, trimed first', () => {
    expect(
      tblank(' ')
    ).toBe(true)
  })

  it('present', () => {
    expect(
      present(' ')
    ).toBe(true)
  })

  it('present, with tab', () => {
    expect(
      present('\t')
    ).toBe(true)
  })

  it('tpresent, trimed first', () => {
    expect(
      tpresent(' ')
    ).toBe(false)
  })
})
