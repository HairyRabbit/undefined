// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string fill
 */

import { substr } from './substr'
import { repeat } from './repeat'
import { ceil } from './../number/ceil'


export function fill(len: number, str: string): string {
  let strlen: number = str.length
  if(strlen === 0) return str
  if(len < strlen) return substr(str, 0, len)

  let re: number = ceil(len / strlen),
      restr: string = repeat(re, str)

  return substr(restr, 0, len)
}
