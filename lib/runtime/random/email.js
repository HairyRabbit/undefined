// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random email
 */


import { randomString, randomListItem } from './core'

const Email_orgs: string[] = ['gmail', 'hotmail', 'live', 'outlook', 'qq', '163', 'sina', '126']
const Email_domains: string[] = ['com', 'cn', 'net', 'org']

export default function email(len: number): number {
  return randomString(5) + '@' +
    randomListItem(Email_orgs) + '.' +
    //randomListItem(Email_domains)
    'com'
}
