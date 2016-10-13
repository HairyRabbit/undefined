// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random boolean
 */

import {
  randomNumber
} from './core'

export default function boolean(): boolean {
  return randomNumber(1) === 0 ? true : false
}
