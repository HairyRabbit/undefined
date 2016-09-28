// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native char
 */

export default function char(str: string, num: number): string {
  return String.prototype.charAt.call(str, num)
}

export function charcode(str: string, num: number): number {
  return String.prototype.charCodeAt.call(str, num)
}

export function fromcharcode(...args: number[]): string {
  return String.fromCharCode.apply(null, args)
}
