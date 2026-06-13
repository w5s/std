import type { Bounded as CoreBounded } from '@w5s/core/Bounded';
import type { Comparable as CoreComparable } from '@w5s/core/Comparable';
import type { Numeric as CoreNumeric } from '@w5s/core/Numeric';

import { Callable } from '@w5s/core/Callable';
import { Symbol } from '@w5s/core/Symbol';

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
    CoreNumeric.Add<T>,
    CoreBounded<T>,
    CoreComparable<T>,
    CoreNumeric.Multiply<T>,
    CoreNumeric.Negate<T>,
    CoreNumeric.Power<T>,
    CoreNumeric.Remainder<T>,
    CoreNumeric.Signed<T>,
    CoreNumeric.Subtract<T>,
    CoreNumeric.Zero<T> {}
}
