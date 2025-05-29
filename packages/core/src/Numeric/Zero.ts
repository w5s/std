export interface Zero<T> {
  /**
   * Returns the additive identity element of `T`, 0.
   *
   * @example
   * ```typescript
   * Number.zero(); // 0
   * ```
   * @category Numeric
   */
  zero(this: void): T;
  /**
   * Returns true if self is equal to the additive identity.
   *
   * @example
   * ```typescript
   * Number.isZero(0); // true
   * Number.isZero(1); // false
   * ```
   * @category Numeric
   * @param self - the BigInt to test
   */
  isZero(this: void, self: T): boolean;
}
