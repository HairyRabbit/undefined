// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native pad
 */

export function padl(count: number, str: string, chars?: string): string {
  return String.prototype.padStart.call(str, count, chars)
}

export function padr(count: number, str: string, chars?: string): string {
  return String.prototype.padEnd.call(str, count, chars)
}
