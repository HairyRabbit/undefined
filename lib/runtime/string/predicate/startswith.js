// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate startswith
 */

export default function startswith(substr: string, str: string): boolean {
  if(str.startsWith) return str.startsWith(substr)
  let regex: RegExp = new RegExp(`^${substr}`)
  return regex.test(str)
}
