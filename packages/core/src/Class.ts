/**
 * A type that represents a class module of `T` instances
 */
export interface Class<T> {
  /**
   * Return `true` if the given value is an instance of the class.
   *
   * @example
   * ```ts
   * const StringType: Class<string> = {
   *   hasInstance: (value) = typeof value === 'string';
   * };
   * StringType.hasInstance('foo'); // true
   * StringType.hasInstance(42); // false
   * ```
   *
   * @category Type
   * @param anyValue
   */
  hasInstance(anyValue: unknown): anyValue is T;
}
