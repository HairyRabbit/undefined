// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/is null
 */

import { or } from '../logic/or'

export function isNil(value: any): boolean {
  return or(
    value === null,
    value === undefined
  )
}

export function isNull(value: any): boolean {
  return value === null
}

export function isUndefined(value: any): boolean {
  return value === undefined
}
