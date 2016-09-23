// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/List range
 */

function baseRange(start: number, end: number, step: number): number[] {
  let len = Math.floor((end - start) / step),
      arr = Array(len),
      i = 0,
      j = start

  for(; i < len; i++) {
    arr[i] = j
    j = j + step
  }

  return arr
}

function fromtoRange(start: number, end: number): number[] {
  let len = end - start,
      arr = Array(len),
      i = 0,
      j = start

  for(; i < len; i++, j++) arr[i] = j

  return arr
}

function simpleRange(len: number): number[] {
  let arr = Array(len),
      i = 0,
      j = 0

  for(; i < len; i++, j++) arr[i] = j

  return arr
}

export function range(...args: number[]): number[] {
  let caller = null
  switch(args.length) {
  case 1:  caller = simpleRange; break;
  case 2:  caller = fromtoRange; break;
  default: caller = baseRange;   break;
  }

  return caller.apply(null, args)
}
