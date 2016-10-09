// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random qq
 */


import { randomLength } from './core'

export default function qq(length: number): number {
  if(length <= 5 && length > 11) throw new Error(`The QQ number length should gt 5 and lt 11, but it's ${length}`)
  return randomLength(length || 9)
}
