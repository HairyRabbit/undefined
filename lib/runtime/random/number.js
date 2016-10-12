// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random number
 */

import {
  randomNumber,
  randomNumberString
} from './core'


type NumberOptions = {
  min?: number,
  max?: number
}

export default function number(opts?: NumberOptions): string {
  let { min = 3, max = 5 } = opts || {}

  return randomNumberString(3, 5)
}
