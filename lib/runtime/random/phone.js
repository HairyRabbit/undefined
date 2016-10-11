// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random phone
 */

import { randomNumberString } from './core'


export default function phone(): string {
  return '1' + randomNumberString(10)
}
