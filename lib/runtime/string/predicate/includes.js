// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate includes
 */

export default function includes(substr: string, str: string): boolean {
  if(str.includes) return str.includes(substr)
  return str.indexOf(substr) !== -1
}
