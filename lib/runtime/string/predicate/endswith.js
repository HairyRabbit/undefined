// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate endswith
 */

export default function endswith(substr: string, str: string): boolean {
  if(str.endsWith) return str.endsWith(substr)
  let regex: RegExp = new RegExp(`${substr}$`)
  return regex.test(str)
}
