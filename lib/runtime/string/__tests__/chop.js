// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../substr')
jest.unmock('./../chop')

import { chopr, chopr1, chopl, chopl1, choprs, chopls } from './../chop'

describe('chop', () => {
  it('chopr', () => {
    expect(
      chopr('bar', 'foobar')
    ).toBe('foo')
  })

  it('chopr1', () => {
    expect(
      chopr1('r', 'foobarrrr')
    ).toBe('fooba')
  })

  it('chopr1, can\'t match', () => {
    expect(
      chopr1('bar', 'foo')
    ).toBe('foo')
  })

  it('chopr1, with word', () => {
    expect(
      chopr1('bar', 'foobarbar')
    ).toBe('foo')
  })

  it('chopl', () => {
    expect(
      chopl('foo', 'foobar')
    ).toBe('bar')
  })

  it('chopl1', () => {
    expect(
      chopl1('f', 'ffffoobar')
    ).toBe('oobar')
  })

  it('chopl1, with word', () => {
    expect(
      chopl1('foo', 'foofoobar')
    ).toBe('bar')
  })

  it('choprs', () => {
    expect(
      choprs(['.jpg', '.png', '.gif'], 'pic.jpg')
    ).toBe('pic')
  })

  it('chopls', () => {
    expect(
      chopls(['-webkit-', '-ms-', '-moz-'], '-webkit-transition')
    ).toBe('transition')
  })
})
