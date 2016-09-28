// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string chop
 */

import { substr } from './substr'

export function chopr(suffix: string, str: string): string {
  if(suffix === '' || str === '') return str

  let suffixlen: number = suffix.length,
      strlen:    number = str.length

  if(suffixlen >= strlen) return str

  let idx: number = str.lastIndexOf(suffix)
  return str.substr(0, idx)
}

export function chopr1(suffix: string, str: string): string {
  if(suffix === '' || str === '') return str

  let suffixlen: number   = suffix.length,
      strlen:    number   = str.length,
      idx:       number   = strlen,
      stack:     number[] = []

  if(suffixlen >= strlen) return str
  if(idx <= 0) return str

  while(idx-- > -1) {
    idx = str.lastIndexOf(suffix, idx)
    stack.push(idx)
  }
  stack.pop()

  return str.substr(0, stack.pop())
}

export function chopl(prefix: string, str: string): string {
  if(prefix === '' || str === '') return str

  let prefixlen: number = prefix.length,
      strlen:    number = str.length,
      idx:       number = str.indexOf(prefix)

  if(prefixlen >= strlen) return str
  if(idx !== 0) return str

  return str.substr(prefixlen)
}

export function chopl1(prefix: string, str: string): string {
  if(prefix === '' || str === '') return str

  let prefixlen: number   = prefix.length,
      strlen:    number   = str.length,
      idx:       number   = str.indexOf(prefix),
      stack:     number[] = []

  if(prefixlen >= strlen) return str
  if(idx !== 0) return str

  while(idx++ > -1) {
    idx = str.indexOf(prefix, idx)
    stack.push(idx)
  }
  stack.pop()

  let fst: number = stack.pop() || idx
  return str.substr(fst + prefixlen)
}

export function choprs(suffixs: string[], str: string): string {
  let len: number = suffixs.length
  if(len === 0 || str === '') return str

  let suffix: string[] = suffixs.filter(n => str.lastIndexOf(n) !== -1)

  return chopr(suffix.pop(), str)
}

export function chopls(prefixs: string[], str: string): string {
  let len: number = prefixs.length
  if(len === 0 || str === '') return str

  let prefix: string[] = prefixs.filter(n => str.indexOf(n) !== -1)

  return chopl(prefix.pop(), str)
}
