import type { PartialKeys } from '@w5s/core-type';

import type { AsInt } from '../AsInt.js';
import type { Comparable } from '../Comparable.js';
import type { Int } from '../Int.js';
import type { Add } from './Add.js';
import type { Multiply } from './Multiply.js';
import type { Negate } from './Negate.js';
import type { One } from './One.js';
import type { Signed } from './Signed.js';
import type { Subtract } from './Subtract.js';
import type { Zero } from './Zero.js';

export interface Numeric<T> extends Add<T>, AsInt<T>, Multiply<T>, Negate<T>, One<T>, Signed<T>, Subtract<T>, Zero<T> {
  /**
   *
   * @param value the Int value to convert to T
   */
  fromInt(this: void, value: Int): T;
}

export interface NumericParameters<T>
  extends
  Comparable.Parameters<T>,
  PartialKeys<Numeric<T>, keyof Negate<T> | keyof One<T> | keyof Signed<T> | keyof Subtract<T> | keyof Zero<T>> {}

export function Numeric<T>(BaseType: NumericParameters<T>): Numeric<T> {
  const {
    asInt,
    compare,
    fromInt,
    negate = (self) => fromInt(-asInt(self) as Int),
    one = () => fromInt(1 as Int),
    zero = () => fromInt(0 as Int),
  } = BaseType;
  const {
    '*': multiply,
    '+': add,
    '-': subtract = (left, right) => add(left, negate(right)),
    abs = (value: T) => (compare(value, zero()) < 0 ? negate(value) : value),
    isNegative = (self: T) => compare(self, zero()) < 0,
    isOne = (self: T) => compare(self, one()) === 0,
    isPositive = (self: T) => compare(self, zero()) > 0,
    isZero = (self: T) => compare(self, zero()) === 0,
    sign = (value: T) => {
      const comparison = compare(value, zero());
      return comparison === 0 ? zero() : comparison === 1 ? one() : negate(one());
    },
  } = BaseType;
  return {
    '*': multiply,
    '+': add,
    '-': subtract,
    abs,
    asInt,
    fromInt,
    isNegative,
    isOne,
    isPositive,
    isZero,
    negate,
    one,
    sign,
    zero,
  };
}
