// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native match
 */


export default function match(str: string, regex: RegExp): ?string[] {
  return String.prototype.match.call(str, regex)
}
