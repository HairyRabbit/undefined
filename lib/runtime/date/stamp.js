// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date stamp
 */

import type { Timestamp } from './types'
import { and } from '../logic/and'
import { toDay, daysMilliseconds } from './day'

export function toTimestamp(date: Date): Timestamp {
  return date.getTime()
}

export function now(): Timestamp {
  return toTimestamp(new Date())
}

export function toDate(timestamp: Timestamp): Date {
  return new Date(timestamp)
}

const Timestamp_MIN: Timestamp = toTimestamp(new Date('1900-01-01'))
const Timestamp_MAX: Timestamp = toTimestamp(new Date('2099-12-31'))

export function isTimestamp(timestamp: Timestamp): boolean {
  return and(
    timestamp >= Timestamp_MIN,
    timestamp <= Timestamp_MAX
  )
}


export function offsetDays(target: Timestamp, days: number): Timestamp {
  return target + daysMilliseconds(days)
}

export function firstDayTimestampOfMonth(stamp: Timestamp): Timestamp {
  let date = toDate(stamp),
      day  = toDay(date)

  return offsetDays(stamp, -day + 1)
}
