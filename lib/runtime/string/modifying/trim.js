// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/modifying trim
 */

const regex_whitespace_start: RegExp = /^[ \t\n\r]+/;
const regex_whitespace_end:   RegExp = /[ \t\n\r]+$/;

export default function trim(str: string): string {
  if(str.trim) return str.trim()
  return str.trimr().triml()
}

export function triml(str: string): string {
  if(str.trimLeft) return str.trimLeft()
  let m = str.match(regex_whitespace_start)
  if(!m.length) return str
  let len: number = m[0].length
  return str.substr(m.index + len)
}

export function trimr(str: string): string {
  if(str.trimRight) return str.trimRight()
  let idx = str.search(regex_whitespace_end)
  if(idx === -1) return str
  return str.substr(0, idx)
}
