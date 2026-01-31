import type * as Core from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Add } from './NumberConversion/Add.js';
import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Negate } from './NumberConversion/Negate.js';
import { Numeric } from './NumberConversion/Numeric.js';
import { Signed } from './NumberConversion/Signed.js';
import { Zero } from './NumberConversion/Zero.js';
import { __defaultConversion } from './NumberConversion/__defaultConversion.js';

export interface NumberConversion<T> {
  /**
   * Converts a number value to type T
   *
   * @param value - A number value
   */
  fromNumber(this: void, value: number): T;
  /**
   * Converts a value of type T to a number
   *
   * @param value - A value of type T
   */
  asNumber(this: void, value: T): number;
}

function call(): NumberConversion.Module<number>;
function call<T>(BaseType: NumberConversion<T>): NumberConversion.Module<T>;
function call<T>(BaseType?: NumberConversion<T>): NumberConversion.Module<T> {
  const base = BaseType ?? __defaultConversion();
  return {
    ...Comparable(base),
    ...Numeric(base),
    ...Signed(base),
    ...Bounded(base),
    ...Negate(base),
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
  Negate,
  Numeric,
  Signed,
  Zero,
});
export namespace NumberConversion {
  export interface Module<T>
    extends
      Core.Comparable<T>,
      Core.Numeric.Add<T>,
      Core.Numeric.Multiply<T>,
      Core.Numeric.Remainder<T>,
      Core.Numeric.Subtract<T>,
      Core.Numeric.Power<T>,
      Core.Numeric.CheckedDivide<T>,
      Core.Numeric.Signed<T>,
      Core.Numeric.Negate<T>,
      Core.Numeric.Zero<T>,
      Core.Bounded<T> {}
}
