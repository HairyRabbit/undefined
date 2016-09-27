// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string dedent
 */

import { repeat } from './repeat'


const Regex_Indent = /^[ \t]*/gm;
const Regex_Space  = /^(?!\s*$)/mg;

function getIndent(str: string): number {
  let matched: ?string[] = str.match(Regex_Indent)

  if(!matched) return 0

  return Math.min.apply(Math, matched.map(x => x.length))
}

export function dedent(str: string, pattern: ?string): string {
  let regex: RegExp,
      indent: number

  if(pattern) {
    regex = new RegExp('^' + pattern, 'gm')
    return str.replace(regex, '')
  } else {
    indent = getIndent(str)
    if(indent === 0) return str
    regex = new RegExp(`^[ \t]{${indent}}`, 'gm')
    return str.replace(regex, '')
  }
}

export function indent(count: ?number, str: string, pattern: ?string): string {
  if(!count || count === 0) return str

  let patt: string   = pattern || ' ',
      prefix: string = repeat(count, patt)

  return str.replace(Regex_Space, prefix)
}
