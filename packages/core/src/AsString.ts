export interface AsString<T> {
  /**
   * Converts the given value to a String.
   *
   * @example
   * ```typescript
   * Number.asString(123); // '123'
   * ```
   * @category String
   * @param self - the object to convert to string
   */
  asString(self: T): string;
}
