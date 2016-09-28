// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native substr
 */


export default function substr(str: string, ...args: number[]): string {
  return String.prototype.substr.apply(str, args)
}
