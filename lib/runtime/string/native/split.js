// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native split
 */


export default function split(str: string, regex: RegExp | string, limit?: number): string[] {
  return String.prototype.split.call(str, regex, limit)
}
