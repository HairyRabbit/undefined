// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string chop
 */

function baseChop(choped: string, str: string, process: (choped: string, str: string) => string) {
  if(choped === '' || str === '') return str

  let chopedlen: number = choped.length,
      strlen: number    = str.length

  if(chopedlen >= strlen) return str

  return process(choped, str)
}


/*
export function chopr(suffix: string, str: string): string {

  if(suffix === '' || str === '') return str

  let suffixlen: number = suffix.length,
      strlen: number = str.length,
      idx: number

  if(suffixlen >= strlen) return str

  idx = str.lastIndexOf(suffix)
  return str.substr(0, idx)
}
*/
export function chopr(suffix: string, str: string): string {
  return baseChop(suffix, str, function(suffix, str) {
    let idx = str.lastIndexOf(suffix)
    return str.substr(0, idx)
  })
}


export function chopr1(suffix: string, str: string): string {
  if(suffix === '' || str === '') return str

  let suffixlen: number = suffix.length,
      strlen: number = str.length,
      idx: number = strlen

  if(suffixlen >= strlen) return str

  while(idx--) {
    idx = str.lastIndexOf(suffix, idx)
  }

  return str.substr(0, idx)
}
