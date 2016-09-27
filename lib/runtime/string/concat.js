// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string concat
 */


export function concat(...args: string[]): string {
  let out: string = '',
      len: number = args.length

  if(len === 0) return out

  for(let i = 0; i < len; i++)
    out += args[i]

  return out
}

export function prepend(prefix: string, str: string): string {
  return prefix + str
}

export function append(suffix: string, str: string): string {
  return str + suffix
}
