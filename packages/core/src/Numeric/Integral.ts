import type { Divide } from './Divide.js';
import type { Remainder } from './Remainder.js';

import { Numeric, type NumericParameters } from './Numeric.js';

/**
 * Integral type
 */
export interface Integral<T> extends Divide<T>, Numeric<T>, Remainder<T> {
  /**
   * Quotient/Modulo operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Integral<T> = ...;
   * const result = Numeric['/%'](left, right);// represents [ left / right, left % right ]
   * ```
   * @category Numeric
   * @param base the base part
   * @param divider the divider part
   */
  '/%'(this: void, base: T, divider: T): [quot: T, mod: T];
}

export interface IntegralParameters<T> extends Divide<T>, NumericParameters<T>, Remainder<T> {}

export function Integral<T>(properties: IntegralParameters<T>): Integral<T> {
  const { '%': mod, '/': quot } = properties;
  return {
    ...Numeric(properties),
    '%': mod,
    '/': quot,
    '/%': (base, divider) => [quot(base, divider), mod(base, divider)],
  };
}
