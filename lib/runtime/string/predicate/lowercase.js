// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate lowercase
 */

export default function lowercase(str: string): boolean {
  let regex: RegExp  = /[A-Z]/,
      out: ?string[] = str.match(regex)

  if(!out) return true

  return out.length === 0
}
