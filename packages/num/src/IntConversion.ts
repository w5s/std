import type { Int } from './Int.js';
import { Bounded } from './IntConversion/Bounded.js';
import { Comparable } from './IntConversion/Comparable.js';
import { Negate } from './IntConversion/Negate.js';

export interface IntConversion<T> {
  /**
   * Converts an integer value to type T
   *
   * @param value - An integer value
   */
  fromInt(this: void, value: Int): T;
  /**
   * Converts a value of type T to an integer
   *
   * @param value - A value of type T
   */
  asInt(this: void, value: T): Int;
}

/**
 * @namespace
 */
export const IntConversion = {
  Bounded,
  Comparable,
  Negate,
};
