// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/Is isBoolean
 */

import { isObjectFlag } from '../help'
import { or } from '../logic/or'


const BooleanFlag = '[object Boolean]'

export function isBoolean(value: any): boolean {
  return or(
    value === true,
    value === false,
    isObjectFlag(BooleanFlag, value)
  )
}
