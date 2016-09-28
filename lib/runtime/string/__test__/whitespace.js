// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../repeat')
jest.unmock('./../fill')
jest.unmock('./../substr')
jest.unmock('./../../number/ceil')
jest.unmock('./../pad')
jest.unmock('./../indent')

import { repeat } from './../repeat'
import { fill }   from './../fill'
import { pad, padl, padr } from './../pad'
import { indent, dedent }  from './../indent'

describe('repeat', () => {
  it('repeat', () => {
    expect(
      repeat(3, 'foo')
    ).toBe('foofoofoo')
  })
})

describe('fill', () => {
  it('fill', () => {
    expect(
      fill(10, 'foo')
    ).toBe('foofoofoof')
  })
  it('fill, short length', () => {
    expect(
      fill(5, 'foobarbaz')
    ).toBe('fooba')
  })
})

describe('pad', () => {
  it('padl', () => {
    expect(
      padl(4, 'foo')
    ).toBe('    foo')
  })
  it('padr', () => {
    expect(
      padr(3, 'foo')
    ).toBe('foo   ')
  })
  it('pad', () => {
    expect(
      pad(8, 'foo')
    ).toBe('  foo   ')
  })
  it('pad, short length', () => {
    expect(
      pad(5, 'foobarbaz')
    ).toBe('foobarbaz')
  })
})


describe('indent', () => {
  it('indent', () => {
    expect(
      indent(4, 'foo')
    ).toBe('    foo')
  })
  it('indent with pattern', () => {
    expect(
      indent(4, 'foo', 't')
    ).toBe('ttttfoo')
  })
  it('dedent', () => {
    expect(
      dedent('    foo')
    ).toBe('foo')
  })
  it('dedent with pattern', () => {
    expect(
      dedent('ttttfoo', 'tttt')
    ).toBe('foo')
  })
})
