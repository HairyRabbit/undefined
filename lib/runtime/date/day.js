// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/Date day
 */

import type { Millisecond, Day, Month, Timestamp } from './types'


const Milliseconds_Sec: Millisecond = 1000
const Milliseconds_Min: Millisecond = 60 * Milliseconds_Sec
const Milliseconds_Hou: Millisecond = 60 * Milliseconds_Min
const Milliseconds_Day: Millisecond = 24 * Milliseconds_Hou

export function daysMilliseconds(days: number): Millisecond {
  return Milliseconds_Day * days
}


export function dayOfMonth(isLeapYear: boolean, mm: Month): Day {
  switch(mm + 1) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    return 31
  case 2:
    return isLeapYear ? 29 : 28
  default:
    return 30
  }
}


export function toDay(date: Date): Day {
  return date.getDate()
}
