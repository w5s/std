import type { Bounded } from '@w5s/core/Bounded';
import type { Comparable } from '@w5s/core/Comparable';
import type { Numeric } from '@w5s/core/Numeric';

import { Callable } from '@w5s/core/Callable';
import { Int as IntType } from '@w5s/core/Type/Int';

import { format } from './Int/format.js';
import { fromNumber } from './Int/fromNumber.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntComparable } from './Int/IntComparable.js';
import { IntIndexable } from './Int/IntIndexable.js';
import { IntIntegral } from './Int/IntIntegral.js';
import { parse } from './Int/parse.js';

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
  fromNumber,
  parse,
});

export namespace Int {
  export interface Module<T extends number>
    extends
    Numeric.Add<T>,
    Bounded<T>,
    Numeric.CheckedDivide<T>,
    Comparable<T>,
    Numeric.Multiply<T>,
    Numeric.Negate<T>,
    Numeric.Power<T>,
    Numeric.Remainder<T>,
    Numeric.Signed<T>,
    Numeric.Subtract<T>,
    Numeric.Zero<T> {}
}
