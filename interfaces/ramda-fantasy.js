/* @flow */
/* eslint-disable no-unused-vars, no-redeclare */


declare module 'ramda-fantasy' {
  declare class Maybe<T> {
    static Just: Just<T>,
    static Nothing: Nothing,
    static isJust(x: Maybe<T>): bool,
    static isNothing(x: Maybe<T>): bool,
    static of(x: U): Just<U>
  }

  //declare function Maybe<T>(x: T): _Maybe<T>


  declare class Just<T> {
    constructor(x: T): void,
    value: T,
    isJust: bool,
    isNothing: bool
  }

  declare class Nothing {
    Nothing(): void
  }

  //declare function Just<T>(x: T): void
  //declare function Nothing(): void

  //declare type Just<T> = Maybe<T>
}
