// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/Is isArray
 */

import { not } from '../logic/not'


export function isArray(value: any) {
  return Array.isArray(value)
}

export function isEmpty(value: any) {
  // TODO isEmpty
  if(not(isArray(value))) throw new Error(`${value} is not Array`)
  return value.length === 0
}
