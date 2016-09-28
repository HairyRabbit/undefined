// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native search
 */


export default function search(str: string, regex: RegExp): number {
  return String.prototype.search.call(str, regex)
}
