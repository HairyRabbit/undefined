// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random age
 */

import { randomNumber } from './core'


type AgeOptions = {
  min?: number,
  max?: number,
  nonage?: boolean
}

const DefaultAgeOptions: AgeOptions = {
  min: 12,
  max: 45,
  nonage: false
}

export default function age(opts?: AgeOptions): number {
  let { min, max, nonage } = Object.assign({}, DefaultAgeOptions, opts)

  if(nonage) max = 18
  return randomNumber(min, max)
}
