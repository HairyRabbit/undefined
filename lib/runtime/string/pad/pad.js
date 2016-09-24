// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string pad
 */

import { fill } from '../fill'
import { ceil } from '../../number/ceil'

export function pad(len: number, str: string, char: ?string): string {
  let strlen = str.length
  if(len <= strlen) return str

  let leftlen  = len - ceil((len - strlen) / 2) - strlen,
      rightlen = len - leftlen - strlen,
      fillchar = !char ? ' ' : char,
      leftstr  = fill(leftlen, fillchar),
      rightstr = fill(rightlen, fillchar)

  return leftstr + str + rightstr
}
