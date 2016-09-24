// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string substr
 */


export function substr(str: string, ...args: number[]): string {
  return String.prototype.substr.apply(str, args)
}
