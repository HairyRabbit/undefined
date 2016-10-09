// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/modifying pad
 */

import fill from './../building/fill'


export default function pad(len: number, str: string, char?: string): string {
  let lenstr = str.length
  if(len === 0 || lenstr > len) return str
  let lencmp: number = Math.floor((len - lenstr) / 2) + lenstr,
      outl: string   = padl(lencmp, str, char),
      outr: string   = padr(len, outl, char)
  return outr
}


export function padl(len: number, str: string, char?: string): string {
  if(str.padLeft) return str.padLeft(len, char)
  let lenstr = str.length
  if(len === 0 || lenstr > len) return str
  let c = char || ' '
  return fill(len - lenstr, c) + str
}

export function padr(len: number, str: string, char?: string): string {
  if(str.padRight) return str.padRight(len, char)
  let lenstr = str.length
  if(len === 0 || lenstr > len) return str
  let c = char || ' '
  return str + fill(len - lenstr, c)
}
