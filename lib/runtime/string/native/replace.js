// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/native replace
 */

type replaceFn = (str: string, ...matched: string[]) => string

export default function replace(str:    string,
                                regex:  string | RegExp,
                                newstr: string | replaceFn): string {
  return String.prototype.replace.call(str, regex, newstr)
}
