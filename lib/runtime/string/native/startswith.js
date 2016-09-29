// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native startswith
 */


export default function startswith(str: string, substr: string, position?: number): boolean {
  return String.prototype.startsWith.call(str, substr, position)
}
