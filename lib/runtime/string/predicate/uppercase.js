// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate uppercase
 */

export default function uppercase(str: string): boolean {
  let regex: RegExp  = /[a-z]/,
      out: ?string[] = str.match(regex)

  if(!out) return true

  return out.length === 0
}
