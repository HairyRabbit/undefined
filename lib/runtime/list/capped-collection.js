// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/*
 * Runtime/List capped-collection
 */
import { isArray } from '../is/array'
import { and } from '../logic/and'

function prepend1<T>(list: Array<T>, a: T): Array<T> {
  // TODO init
  let init = list.slice(0, -1)
  return [].concat(a, init)
}

function prepend2<T>(list: Array<T>, a: T, b: T): Array<T> {
  let init = list.slice(0, -2)
  return [].concat(a, b, init)
}

function prepend3<T>(list: T[], a: T, b: T, c: T): T[] {
  let init = list.slice(0, -3)
  return [].concat(a, b, c, init)
}

function prepend4<T>(list: T[], a: T, b: T, c: T, d: T): T[] {
  let init = list.slice(0, -4)
  return [].concat(a, b, c, d, init)
}

function prepend5<T>(list: T[], a: T, b: T, c: T, d: T, e: T): T[] {
  let init = list.slice(0, -5)
  return [].concat(a, b, c, d, e, init)
}

function prependn<T>(list: T[], ...args: T[]): T[] {
  let init = list.slice(0, -args.length)
  return [].concat(args, init)
}


export function prepend<T>(list: T[], ...args: T[]): T[] {
  let caller,
      len = args.length

  if(len === 0) return list

  switch(len) {
  case 1:  caller = prepend1; break;
  case 2:  caller = prepend2; break;
  case 3:  caller = prepend3; break;
  case 4:  caller = prepend4; break;
  case 5:  caller = prepend5; break;
  default: caller = prependn; break;
  }

  return caller.bind(null, list).apply(null, args)
}

export function prepend$<T>(list: Array<T>, member: T): Array<T> {
  let tail = list.slice(0, -1)
  return [].concat(member, tail)
}

/*
export function append(list: Array<T>, member: T): Array<T> {

}
*/
