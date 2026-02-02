import type { Int } from './Type/Int.js';

export interface AsInt<T> {
  /**
   * Converts the given value to a Int.
   *
   * @example
   * ```typescript
   * const SomeType: AsInt<T>;
   * const value: T;
   * SomeType.asInt(value); // Int(...)
   * ```
   * @category Numeric
   * @param self - the object to convert to Int
   */
  asInt(this: void, self: T): Int;
}
