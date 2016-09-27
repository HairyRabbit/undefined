// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/String/Whitespace trim
 */

function isSupports(): boolean {
  return String.prototype.hasOwnProperty('trim')
}

export function triml(str: string): string {
  if(!isSupports()) throw new Error(`string.trimLeft() can't find.`)
  return str.trimLeft()
}

export function trimr(str: string): string {
  if(!isSupports()) throw new Error(`string.trimRight() can't find.`)
  return str.trimRight()
}

export function trim(str: string): string {
  if(!isSupports()) throw new Error(`string.trim() can't find.`)
  return str.trim()
}
