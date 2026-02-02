import type { PartialKeys } from '@w5s/core-type';
import type { Comparable } from '../Comparable.js';
import type { Int } from '../Int.js';
import type { One } from './One.js';
import type { Zero } from './Zero.js';
import type { Negate } from './Negate.js';
import type { Add } from './Add.js';
import type { Subtract } from './Subtract.js';
import type { Multiply } from './Multiply.js';
import type { Signed } from './Signed.js';
import type { AsInt } from '../AsInt.js';

export interface Numeric<T> extends Negate<T>, One<T>, Zero<T>, Add<T>, Signed<T>, Subtract<T>, Multiply<T>, AsInt<T> {
  /**
   *
   * @param value - the Int value to convert to T
   */
  fromInt(this: void, value: Int): T;
}

export interface NumericParameters<T>
  extends
    PartialKeys<Numeric<T>, keyof Zero<T> | keyof One<T> | keyof Signed<T> | keyof Subtract<T>>,
    Comparable.Parameters<T> {}

export function Numeric<T>(BaseType: NumericParameters<T>): Numeric<T> {
  const {
    fromInt,
    compare,
    negate,
    '+': add,
    '-': subtract = (left, right) => add(left, negate(right)),
    '*': multiply,
    one = () => fromInt(1 as Int),
    isOne = (self: T) => compare(self, one()) === 0,
    zero = () => fromInt(0 as Int),
    isZero = (self: T) => compare(self, zero()) === 0,
    abs = (value: T) => (compare(value, zero()) < 0 ? negate(value) : value),
    sign = (value: T) => {
      const comparison = compare(value, zero());
      return comparison === 0 ? zero() : comparison === 1 ? one() : negate(one());
    },
    isPositive = (self: T) => compare(self, zero()) > 0,
    isNegative = (self: T) => compare(self, zero()) < 0,
    asInt,
  } = BaseType;
  return {
    negate,
    zero,
    isZero,
    abs,
    sign,
    isPositive,
    isNegative,
    one,
    isOne,
    '+': add,
    '-': subtract,
    '*': multiply,
    fromInt,
    asInt,
  };
}
