// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native include
 */


export default function include(str: string, substr: string, position?: number): boolean {
  return String.prototype.includes.call(str, substr, position)
}
