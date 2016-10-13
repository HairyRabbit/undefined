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

const Numbers: string = '0123456789'
const Letters: string = 'abcdefghijklmnovqrstuvwxyz'
const CapitalLetters: string = 'ABCDEFGHIJKLMNOVQRSTUVWXYZ'
const Chars: string = Numbers + Letters + CapitalLetters

export function randomLength(len: number): number {
  if(len <= 0) return 0
  let num: number = 0
  for(let i = 0; i < len; i++) {
    num += Math.pow(10, i) * randomNumber(10)
  }
  return num
}


export function randomNumberString(len: number): string {
  return randomListString(Numbers, len)
}

export function randomString(len: number): string {
  return randomListString(Chars, len)
}


export function randomBoolean(): boolean {
  return randomNumber(1) === 0 ? true : false
}


export function randomListItem<T>(list: T[]): T {
  if(list.length === 0) throw new Error(`Empty list: ${list.toString()}`)
  let seed = randomNumber(list.length)
  return list[seed]
}

export function randomListString(str: string, len?: number): string {
  if(!len) return str
  if(len <= 0 && str.length === 0) return ''
  let out: string = ''
  for(let i = 0; i < len; i++) {
    out += randomListItem(str.split(''))
  }
  return out
}

export function randomListItems<T>(list: T[], len?: number): T[] {
  if(!len) return list
  if(len <= 0 && list.length === 0) return []
  let out: T[] = list
  while(len--) {
    let idx: number = randomNumber(list.length),
        left: T[] = list.slice(0, idx),
        right: T[] = list.slice(idx + 1)

    out = left.concat(right)
  }
  return out
}
