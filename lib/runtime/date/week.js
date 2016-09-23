// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date week
 */

import type { Week, Timestamp } from './types'
import { toDate } from './stamp'

export function toWeek(date: Date): Week {
  return date.getDay()
}


export function weekBeginWithSunday(week: Week): Week {
  return week === 0 ? 6 : week - 1
}


export function weekOfTimestamp(stamp: Timestamp): Week {
  return toWeek(toDate(stamp))
}
