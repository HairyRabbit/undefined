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


const Chars = 'abcdefghijklmnovqrstuvwxyz0123456789'
//const chars = 'ABCDEFGHIJKLMNOVQRSTUVWXYZ'

export function randomString(len: number): string {
  if(len <= 0) return ''
  //return Math.random().toString(36).substring(len)
  let out: string = ''
  for(let i = 0; i < len; i++) {
    out += randomListItem(Chars)
  }
  return out
}


export function randomListItem<T>(list: T[]): T {
  let seed = randomNumber(list.length)
  return list[seed]
}
