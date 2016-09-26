// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string isBlank
 */

import { trim } from './trim'

export function isBlank(str: string): boolean {
  return str === ''
}

export function isTrimedBlank(str: string): boolean {
  return trim(str) === ''
}
