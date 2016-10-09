// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/building fill
 */

import repeat from './repeat'


export default function fill(len: number, str: string): string {
  let strlen: number = str.length
  if(strlen === 0) return str
  if(len < strlen) return str.substr(0, len)

  let count: number = Math.ceil(len / strlen),
      restr: string = repeat(count, str)

  return restr.substr(0, len)
}
