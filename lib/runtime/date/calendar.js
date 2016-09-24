// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date calendar
 */

import type { Timestamp, Week } from './types'
import { offsetDays, firstDayTimestampOfMonth } from './stamp'
import { weekOfTimestamp, weekBeginWithSunday } from './week'
import { range } from '../list/range'
import { prepend } from '../list/capped-collection'



const Calendar_ROW: number = 6
const Calendar_COL: number = 7

// TODO queue not only number[]
function createCalendarQueue(): number[] {
  return range(Calendar_ROW * Calendar_COL)
}

function createPrependedQueue(week: Week): number[] {
  return range(-1, -(week + 1) - 1, -1).reverse()
}

function mapToDate(target: Timestamp) {
  return function(offset: number) {
    return offsetDays(target, offset)
  }
}

export function calendar(stamp: Timestamp): Date[] {
  let fst = firstDayTimestampOfMonth(stamp),
      week = weekBeginWithSunday(weekOfTimestamp(fst)),
      basequeue = createCalendarQueue(),
      prependqueue = createPrependedQueue(week),
      queue = prepend.bind(null, basequeue).apply(null, prependqueue),
      dates = queue.map(mapToDate(fst))

  return dates
}
