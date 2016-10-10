// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random qq
 */


import { randomNumberString } from './core'

export default function qq(len: number): string {
  if(len <= 5 && len > 11) throw new Error(`The QQ number len should gt 5 and lt 11, but it's ${len}`)
  return randomNumberString(len || 9)
}
