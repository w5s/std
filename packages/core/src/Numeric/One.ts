export interface One<T> {
  /**
   * Returns the additive identity element of `T`, 0.
   *
   * @example
   * ```typescript
   * Number.one(); // 1
   * ```
   * @category Numeric
   */
  one(this: void): T;
  /**
   * Returns true if self is equal to the multiplicative identity.
   *
   * @example
   * ```typescript
   * Number.isOne(1); // true
   * Number.isOne(0); // false
   * ```
   * @category Numeric
   * @param self - the value to test
   */
  isOne(this: void, self: T): boolean;
}
