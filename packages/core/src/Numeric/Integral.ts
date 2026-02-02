import type { Divide } from './Divide.js';
import { Numeric, type NumericParameters } from './Numeric.js';
import type { Remainder } from './Remainder.js';

export interface IntegralParameters<T> extends NumericParameters<T>, Divide<T>, Remainder<T> {}

/**
 * Integral type
 */
export interface Integral<T> extends Numeric<T>, Divide<T>, Remainder<T> {
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
   * @param base - the base part
   * @param divider - the divider part
   */
  '/%'(this: void, base: T, divider: T): [quot: T, mod: T];
}

export function Integral<T>(properties: IntegralParameters<T>): Integral<T> {
  const { '/': quot, '%': mod } = properties;
  return {
    ...Numeric(properties),
    '/': quot,
    '%': mod,
    '/%': (base, divider) => [quot(base, divider), mod(base, divider)],
  };
}
