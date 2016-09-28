// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native idx
 */


export default function idx(str: string, substr: string, from?: number): number {
  return String.prototype.indexOf.call(str, substr, from)
}

export function idxr(str: string, substr: string, from?: number): number {
  return String.prototype.lastIndexOf.call(str, substr, from)
}
