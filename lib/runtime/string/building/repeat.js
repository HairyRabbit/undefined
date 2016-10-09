// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/building repeat
 */

export default function repeat(count: number, str: string): string {
  if(str.repeat) return str.repeat(count)
  if(count <= 0 || str === '') return str
  let out: string = ''
  while(count--) {
    out += str
  }
  return out
}
