// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string/predicate blank
 */

import trim from './../modifying/trim'

export default function blank(str: string): boolean {
  return str === ''
}

export function tblank(str: string): boolean {
  return blank(trim(str))
}


export function present(str: string): boolean {
  return !blank(str)
}

export function tpresent(str: string): boolean {
  return present(trim(str))
}
