export interface AsString<T> {
  /**
   * Converts the given value to a String.
   *
   * @example
   * ```typescript
   * Number.asString(123); // '123'
   * ```
   * @category Formatting
   * @param self - the object to convert to string
   */
  asString(this: void, self: T): string;
}
