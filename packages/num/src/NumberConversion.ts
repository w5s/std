import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Negate } from './NumberConversion/Negate.js';
import { Numeric } from './NumberConversion/Numeric.js';
import { Signed } from './NumberConversion/Signed.js';
import { Zero } from './NumberConversion/Zero.js';

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
  Numeric,
  Signed,
  Zero,
};
