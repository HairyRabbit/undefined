// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native trim
 */


export default function trim(str: string): string {
  return String.prototype.trim.call(str)
}


export function triml(str: string): string {
  return String.prototype.trimLeft.call(str)
}

export function trimr(str: string): string {
  return String.prototype.trimRight.call(str)
}
