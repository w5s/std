import type * as Core from '@w5s/core';

import { Callable } from '@w5s/core/dist/Callable.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';

import { defaultConversion } from './internal/defaultConversion.js';
import { Add } from './NumberConversion/Add.js';
import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Multiply } from './NumberConversion/Multiply.js';
import { Negate } from './NumberConversion/Negate.js';
import { Power } from './NumberConversion/Power.js';
import { Remainder } from './NumberConversion/Remainder.js';
import { Signed } from './NumberConversion/Signed.js';
import { Subtract } from './NumberConversion/Subtract.js';
import { Zero } from './NumberConversion/Zero.js';

export interface NumberConversion<T> {
  /**
   * Converts a value of type T to a number
   *
   * @param value A value of type T
   */
  asNumber(this: void, value: T): number;

  /**
   * Converts a number value to type T
   *
   * @param value A number value
   */
  fromNumber(this: void, value: number): T;
}

function call(): NumberConversion.Module<number>;
function call<T>(BaseType: NumberConversion<T>): NumberConversion.Module<T>;
function call<T>(BaseType?: NumberConversion<T>): NumberConversion.Module<T> {
  const base = BaseType ?? defaultConversion();
  return {
    ...Add(base),
    ...Bounded(base),
    ...Comparable(base),
    ...Multiply(base),
    ...Negate(base),
    ...Power(base),
    ...Remainder(base),
    ...Signed(base),
    ...Subtract(base),
    ...Zero(base),
  };
}

/**
 * @namespace
 */
export const NumberConversion = Callable({
  Add,
  Bounded,
  Comparable,
  Multiply,
  Negate,
  Power,
  Remainder,
  Signed,
  Subtract,
  [Symbol.call]: call,
  Zero,
});
export namespace NumberConversion {
  export interface Module<T>
    extends
    Core.Numeric.Add<T>,
    Core.Bounded<T>,
    Core.Comparable<T>,
    Core.Numeric.Multiply<T>,
    Core.Numeric.Negate<T>,
    Core.Numeric.Power<T>,
    Core.Numeric.Remainder<T>,
    Core.Numeric.Signed<T>,
    Core.Numeric.Subtract<T>,
    Core.Numeric.Zero<T> {}
}
