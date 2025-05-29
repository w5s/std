export interface Negate<T, Return = T> {
  /**
   * Negates the given value.
   *
   * @example
   * ```typescript
   * Number.negate(5); // -5
   * Number.negate(Number.negate(5)); // 5
   * ```
   *
   * @category Numeric
   * @param self - The value to negate.
   */
  negate(self: T): Return;
}
