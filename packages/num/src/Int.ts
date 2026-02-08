import { Int as IntType } from '@w5s/core/dist/Type/Int.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import type * as Core from '@w5s/core';
import { format } from './Int/format.js';
import { parse } from './Int/parse.js';
import { fromNumber } from './Int/fromNumber.js';
import { IntIntegral } from './Int/IntIntegral.js';
import { IntIndexable } from './Int/IntIndexable.js';
import { IntComparable } from './Int/IntComparable.js';
import { IntBounded } from './Int/IntBounded.js';

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
  ...IntComparable,
  ...IntIntegral,
  ...IntBounded,
  ...IntIndexable,
  format,
  parse,
  fromNumber,
});

export namespace Int {
  export interface Module<T extends number>
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
