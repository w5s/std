import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Negate } from './NumberConversion/Negate.js';

export interface NumberConversion<T> {
  /**
   * Converts a number value to type T
   *
   * @param value - A number value
   */
  fromNumber(this: void, value: number): T;
  /**
   * Converts a value of type T to a number
   *
   * @param value - A value of type T
   */
  asNumber(this: void, value: T): number;
}

/**
 * @namespace
 */
export const NumberConversion = {
  Bounded,
  Comparable,
  Negate,
};
