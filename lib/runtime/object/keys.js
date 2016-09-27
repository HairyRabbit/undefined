// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/object keys
 */

export function keys(object: any): any[] {
  if(Object.keys) return Object.keys(object)

  let out = []
  for(let key in object) {
    out.push(key)
  }
  return out
}
