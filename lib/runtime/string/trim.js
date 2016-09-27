// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/String/Whitespace trim
 */

function isSupports(): boolean {
  return String.prototype.hasOwnProperty('trim')
}

const Regex_Whitespace_Left  = /^[ \t\n\r]+/;
const Regex_Whitespace_Right = /[ \t\n\r]+$/;

function _triml(str: string): string {
  return str.replace(Regex_Whitespace_Left, '')
}

function _trimr(str: string): string {
  return str.replace(Regex_Whitespace_Right, '')
}

function _trim(str): string {
  return _trimr(_triml(str))
}

export function triml(str: string): string {
  if(isSupports()) return str.trimLeft()
  return _trimLeft(str)
}

export function trimr(str: string): string {
  if(isSupports()) return str.trimRight()
  return _trimRight(str)
}

export function trim(str: string): string {
  if(isSupports()) return str.trim()
  return _trim(str)
}
