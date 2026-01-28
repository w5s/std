import { Int as IntType } from '@w5s/core/dist/Type/Int.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import type { Bounded, Comparable, Numeric } from '@w5s/core';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { fromNumber } from './Int/fromNumber.js';
import { IntNumeric } from './Int/IntNumeric.js';
import { IntSigned } from './Int/IntSigned.js';
import { IntIndexable } from './Int/IntIndexable.js';
import { IntNegate } from './Int/IntNegate.js';
import { IntZero } from './Int/IntZero.js';

/**
 * Create a module `number` type
 *
 * @example
 */
function Make<T extends number>(): Int.Module<T> {
  return {
    ...IntComparable,
    ...IntNumeric,
    ...IntSigned,
    ...IntBounded(),
    ...IntNegate,
    ...IntZero,
  } as unknown as Int.Module<T>;
}

/**
 * Integer value
 *
 * Alias of {@link @w5s/core!Type.Int}
 */
export type Int = IntType;

/**
 * A collection of functions to manipulate integer values
 *
 * @namespace
 */
export const Int = Callable({
  ...IntType,
  ...IntIndexable,
  ...Make<Int>(),
  Make,
  format,
  parse,
  fromNumber,
});

export namespace Int {
  export interface Module<T extends number>
    extends
      Comparable<T>,
      Numeric.Add<T>,
      Numeric.Multiply<T>,
      Numeric.Remainder<T>,
      Numeric.Subtract<T>,
      Numeric.Power<T>,
      Numeric.CheckedDivide<T>,
      Numeric.Signed<T>,
      Numeric.Negate<T>,
      Numeric.Zero<T>,
      Bounded<T> {}
}
