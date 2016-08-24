/* @flow */
/* eslint-disable no-unused-vars, no-redeclare */



declare module 'ramda-fantasy' {


  declare interface Setoid<T> {
    equals(a: T): bool
  }


  declare class Semigroup<T> {
  }


  declare class Monoid<T> extends Semigroup<T> {}


  declare class Functor<T> {}

  declare class Foldable {}






  declare class Maybe<T> {
    static Just(x: T): Just<T>,
    static Nothing(): Nothing,
    static isJust(x: Maybe<T>): bool,
    static isNothing(x: Maybe<T>): bool,
    static of(x: T): Just<T>,
    //static maybe: CurriedFunction2<any, any, any>,
    //ap: CurriedFunction2<Maybe<Function>, Maybe<T>>
  }

  declare class Just<T> extends Maybe<T> {
    constructor(x: T): void,
    toString(): string,
    value: T,
    isJust: bool,
    isNothing: bool,
    ap(fn: Just<*>): Just<T>
  }

  declare class Nothing extends Maybe {
    Nothing(): void,
    toString(): string,
    ap(): Nothing
  }
}
