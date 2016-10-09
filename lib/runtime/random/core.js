// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random core
 */


export function randomNumber(num1: number, num2?: number): number {
  if(!num2) num2 = 0
  let diff: number = Math.abs(num2 - num1),
      min: number  = Math.min(num1, num2)
  return Math.floor(Math.random() * diff) + min
}
