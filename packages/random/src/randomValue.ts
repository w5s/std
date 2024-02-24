import type { Tag } from '@w5s/core';
import { invariant } from '@w5s/invariant';

export type RandomValue = Tag<number, { min: 0; max: 1 }>;

/**
 * @namespace
 */
export const RandomValue = {
  /**
   * Return a new random value from number 0<= N <=1.
   * An invariant error is thrown when invalid number is given
   *
   * @example
   * ```typescript
   * const random = RandomValue.of(0);
   * ```
   * @category Constructor
   * @param numeric - numeric value >=0 and <=1
   */
  of(numeric: number): RandomValue {
    invariant(RandomValue.hasInstance(numeric), `Random value should be between 0 and 1. Got ${numeric}`);
    return numeric;
  },
  /**
   * Return `true` if `anyValue` is a valid `RandomValue`
   *
   * @example
   * ```typescript
   * RandomValue.hasInstance(null); // === false
   * RandomValue.hasInstance(RandomValue.of(0)); // === true
   * ```
   * @category Type
   * @param anyValue - an unknown value to be refined
   */
  hasInstance(anyValue: unknown): anyValue is RandomValue {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue) && anyValue >= 0 && anyValue <= 1;
  },
};
