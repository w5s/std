import { number as NumberType } from '@w5s/core/dist/Type/number.js';
import type { Bounded, Comparable, Numeric } from '@w5s/core';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';
import { NumberConversion } from './NumberConversion.js';
import { NumberNumeric } from './Number/NumberNumeric.js';

/**
 * Create a module `number` type
 *
 * @example
 */
function Make<T extends number>(): Number.Module<T> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...NumberConversion.Comparable(),
    ...NumberNumeric,
    ...NumberConversion.Signed(),
    ...NumberConversion.Bounded(),
    ...NumberConversion.Negate(),
    ...NumberConversion.Zero(),
  } as Number.Module<T>;
}

/**
 * A collection of functions to manipulate `number`
 *
 * @example
 * ```typescript
 * import { Number } from '@w5s/core';
 *
 * const total = [1, 1.5, 2].reduce(Number['+'], 0);// 4.5
 * Number['=='](total, 4.5);// true
 * ```
 * @namespace
 */
export const Number = {
  ...NumberType,
  ...Make<number>(),
  Make,
  parse,
  format,
};

export namespace Number {
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
