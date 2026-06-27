import { Int as IntType } from '@w5s/core/Type/Int';
import { Callable } from '@w5s/core/Callable';
import type { Bounded } from '@w5s/core/Bounded';
import type { Comparable } from '@w5s/core/Comparable';
import type { Numeric } from '@w5s/core/Numeric';
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
