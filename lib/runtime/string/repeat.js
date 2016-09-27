// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string repeat
 */

export function repeat(n: number, str: string): string {
  if(n <= 0)     return str
  if(str === '') return str

  let out: string = ''

  while(n--) {
    out += str
  }

  return out
}
