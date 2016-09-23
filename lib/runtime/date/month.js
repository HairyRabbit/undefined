// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date month
 */

import type { Month } from './types.js'


export function toMonth(date: Date): Month {
  return date.getMonth()
}
