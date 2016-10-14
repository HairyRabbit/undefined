// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random date
 */

import { randomNumber } from './core'


export default function date(): string {
  let yy: number = randomNumber(1900, 2099),
      mm: number = randomNumber(1, 13),
      dd: number = randomNumber(1, 32)

  return [String(yy), String(mm), String(dd)].join('-')
}
