// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/Login or
 */

function or1(a: boolean): boolean {
  return a
}

function or2(a: boolean, b: boolean): boolean {
  return a || b
}

function or3(a: boolean, b: boolean, c: boolean): boolean {
  return a || b || c
}

function or4(a: boolean, b: boolean, c: boolean, d: boolean): boolean {
  return a || b || c || d
}

function or5(a: boolean, b: boolean, c: boolean, d: boolean, e: boolean): boolean {
  return a || b || c || d || e
}

function orn(...args: boolean[]): boolean {
  return args.reduce((acc, curr) => acc || curr, true)
}

export function or(...args: boolean[]): boolean {
  let caller = null
  switch(args.length) {
  case 1:  caller = or1; break;
  case 2:  caller = or2; break;
  case 3:  caller = or3; break;
  case 4:  caller = or4; break;
  case 5:  caller = or5; break;
  default: caller = orn; break;
  }

  return caller.apply(null, args)
}
