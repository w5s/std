import type * as Core from '@w5s/core';

import { Callable } from '@w5s/core/dist/Callable.js';
import { Int as IntType } from '@w5s/core/dist/Type/Int.js';

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
    Core.Numeric.Add<T>,
    Core.Bounded<T>,
    Core.Numeric.CheckedDivide<T>,
    Core.Comparable<T>,
    Core.Numeric.Multiply<T>,
    Core.Numeric.Negate<T>,
    Core.Numeric.Power<T>,
    Core.Numeric.Remainder<T>,
    Core.Numeric.Signed<T>,
    Core.Numeric.Subtract<T>,
    Core.Numeric.Zero<T> {}
}
