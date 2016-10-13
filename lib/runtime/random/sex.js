// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random sex
 */

import { randomNumber, randomListItem } from './core'

const SexEn = [ 'male', 'fmale', 'secret' ]
const SexZh = ['男', '女', '保密']

type SexOptions = {
  zh: boolean,
  nn: boolean
}

const DefaultSexOptions: SexOptions = {
  zh: false,
  nn: false
}

export default function sex(opts?: SexOptions): string {
  let { zh, nn } = Object.assign({}, DefaultSexOptions, opts),
      idx = randomNumber(nn ? 1 : 2)

  return !zh ? SexEn[idx] : SexZh[idx]
}
