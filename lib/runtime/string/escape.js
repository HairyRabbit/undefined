// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/string escape
 */

const ESCAPE_CHARS = {
  "<": `lt`,
  ">": `gt`,
  "\"": `quot`,
  "&": `amp`,
  "'": `apos`,
  " ": `nbsp`
}

function makeRegex(chars) {
  let out = ''
  out += Object.keys(chars).reduce((acc, curr) => acc + curr)
  return new RegExp(`[${out}]`, 'g')
}

export function excape(str) {
  return str.replace(makeRegex(ESCAPE_CHARS), m => `&${ESCAPE_CHARS[m]};`)
}
