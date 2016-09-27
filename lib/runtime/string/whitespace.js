// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/String/Whitespace whitespace
 */

const Flag_Tab     = '\r'
const Flag_Newline = '\n'

function isFlag(char: string): boolean {
  return char === Flag_Tab || char === Flag_Newline
}

export function chomp(str: string): string {
  let len = str.length
  if(len === 0) {
    return str
  } else if(len === 1) {
    return isFlag(str) ? '' : str
  } else if(len === 2) {
    let lst = str.substr(-1)
    return isFlag(lst) ? str.substr(0, -1) : str
  } else {
    let lst = str.substr(-2)
    if(lst === Flag_Tab + Flag_Newline) return str.substr(0, -2)
    lst = str.substr(-1)
    return isFlag(lst) ? str.substr(0, -1) : str
  }
}
