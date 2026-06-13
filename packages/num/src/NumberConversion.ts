import type { Bounded as CoreBounded } from '@w5s/core/Bounded';
import type { Numeric as CoreNumeric } from '@w5s/core/Numeric';
import type { Comparable as CoreComparable } from '@w5s/core/Comparable';
import { Callable } from '@w5s/core/Callable';
import { Symbol } from '@w5s/core/Symbol';
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
import { __defaultConversion } from './NumberConversion/__defaultConversion.js';

export interface NumberConversion<T> {
  /**
   * Converts a number value to type T
   *
   * @param value A number value
   */
  fromNumber(this: void, value: number): T;

  /**
   * Converts a value of type T to a number
   *
   * @param value A value of type T
   */
  asNumber(this: void, value: T): number;
}

function call(): NumberConversion.Module<number>;
function call<T>(BaseType: NumberConversion<T>): NumberConversion.Module<T>;
function call<T>(BaseType?: NumberConversion<T>): NumberConversion.Module<T> {
  const base = BaseType ?? __defaultConversion();
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
  [Symbol.call]: call,
  Add,
  Bounded,
  Comparable,
  Multiply,
  Negate,
  Power,
  Remainder,
  Signed,
  Subtract,
  Zero,
});
export namespace NumberConversion {
  export interface Module<T>
    extends
    CoreComparable<T>,
    CoreNumeric.Add<T>,
    CoreNumeric.Multiply<T>,
    CoreNumeric.Remainder<T>,
    CoreNumeric.Subtract<T>,
    CoreNumeric.Power<T>,
    CoreNumeric.Signed<T>,
    CoreNumeric.Negate<T>,
    CoreNumeric.Zero<T>,
    CoreBounded<T> {}
}
