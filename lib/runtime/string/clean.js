// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string clean
 */

import { trim } from './trim'

export function clean(str: string): string {
  return trim(str).replace(/\s\s+/g, ' ')
}
