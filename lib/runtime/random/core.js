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


export function randomLength(len: number): number {
  if(len <= 0) return 0
  let num: number = 0
  for(let i = 0; i < len; i++) {
    num += Math.pow(10, i) * randomNumber(10)
  }
  return num
}
