// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/Login and
 */

function and1(a: boolean): boolean {
  return a
}

function and2(a: boolean, b: boolean): boolean {
  return a && b
}

function and3(a: boolean, b: boolean, c: boolean): boolean {
  return a && b && c
}

function and4(a: boolean, b: boolean, c: boolean, d: boolean): boolean {
  return a && b && c && d
}

function and5(a: boolean, b: boolean, c: boolean, d: boolean, e: boolean): boolean {
  return a && b && c && d && e
}

function andn(...args: boolean[]): boolean {
  // TODO reduce
  return args.reduce((acc, curr) => acc && curr, true)
}

export function and(...args: boolean[]): boolean {
  let caller = null
  switch(args.length) {
  case 1:  caller = and1; break;
  case 2:  caller = and2; break;
  case 3:  caller = and3; break;
  case 4:  caller = and4; break;
  case 5:  caller = and5; break;
  default: caller = andn; break;
  }

  return caller.apply(null, args)
}
