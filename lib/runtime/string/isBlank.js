// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string isBlank
 */

export function isBlank(str: string): boolean {
  return /^\s*$/.test(str)
}
