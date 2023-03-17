import type { Tag } from '@w5s/core';
import { invariant } from '@w5s/core/lib/invariant.js';

export type RandomValue = Tag<number, { min: 0; max: 1 }>;

/**
 * Return a new random value from number 0<= N <=1.
 * An invariant error is thrown when invalid number is given
 *
 * @example
 * ```typescript
 * const random = RandomValue(0);
 * ```
 * @category Constructor
 * @param numeric - numeric value >=0 and <=1
 */
export function RandomValue(numeric: number): RandomValue {
  invariant(RandomValue.hasInstance(numeric), `Random value should be between 0 and 1. Got ${numeric}`);
  return numeric;
}
export namespace RandomValue {
  /**
   * Return `true` if `anyValue` is a valid `RandomValue`
   *
   * @example
   * ```typescript
   * RandomValue.hasInstance(null); // === false
   * RandomValue.hasInstance(RandomValue(0)); // === true
   * ```
   * @param anyValue - an unknown value to be refined
   */
  export function hasInstance(anyValue: unknown): anyValue is RandomValue {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue) && anyValue >= 0 && anyValue <= 1;
  }
}
