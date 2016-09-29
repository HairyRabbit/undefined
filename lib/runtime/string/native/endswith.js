// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native endswith
 */


export default function endswith(str: string, substr: string, position?: number): boolean {
  return String.prototype.endsWith.call(str, substr, position)
}
