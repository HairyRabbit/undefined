// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native repeat
 */

export default function repeat(count: number, str: string): string {
  return String.prototype.repeat.call(str, count)
}
