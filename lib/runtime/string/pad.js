// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string pad
 */

import { fill } from './fill'
import { ceil } from './../number/ceil'

export function pad(len: number, str: string, char: ?string): string {

  let lenstr = str.length

  if(len <= lenstr) return str

  let lenl = len - ceil((len - lenstr) / 2) - lenstr,
      lenr = len - lenl - lenstr,
      c    = char || ' ',
      strl = padl(lenl, str, c),
      strr = padr(lenr, strl, c)

  return strr
}


export function padl(len: number, str: string, char: ?string): string {
  if(len === 0) return str
  let c = char || ' '
  return fill(len, c) + str
}

export function padr(len: number, str: string, char: ?string): string {
  if(len === 0) return str
  let c = char || ' '
  return str + fill(len, c)
}
