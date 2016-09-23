// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/Is isNumber
 */

import { isObjectFlag } from '../help'
import { and } from '../logic/and'
import { not } from '../logic/not'

const NumberFlag = '[object Number]'

export function isNan(value: any): boolean {
  return and(
    isNumber(value),
    // NaN !== NaN
    value !== value
  )
}

export function isNumber(value: any): boolean {
  return and(
    not(isNan(value)),
    isObjectFlag(NumberFlag, value)
  )
}
