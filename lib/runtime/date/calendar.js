// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date calendar
 */

import type { Timestamp } from './types'
import { offsetDays, firstDayTimestampOfMonth } from './stamp'
import { weekOfTimestamp, weekBeginWithSunday } from './week'
import { range } from '../list/range'
import { prepend } from 'runtime/list/capped-collection'



const Calendar_ROW: number = 6
const Calendar_COL: number = 7

// TODO queue not only number[]
function createCalendarQueue(): number[] {
  return range(Calendar_ROW * Calendar_COL)
}

function createPrependedQueue(week: Week): number[] {
  return range(-1, -(week + 1) - 1, -1).reverse()
}

function mapToDate(target) {
  return function(offset) {
    return offsetDays(target, offset)
  }
}

export function calendar(stamp: Timestamp): Timestamp[] {
  let fst = firstDayTimestampOfMonth(stamp),
      week = weekBeginWithSunday(weekOfTimestamp(fst)),
      basequeue = createCalendarQueue(),
      prependqueue = createPrependedQueue(week),
      queue = prepend(basequeue, prependqueue),
      dates = queue.map(mapToDate(fst))

  return dates
}
