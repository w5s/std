/**
 * A type that represents a class module of `T` instances
 */
export interface Type<T> {
  /**
   * Type string representation
   *
   * @example
   * ```ts
   * StringType.typeName // 'string'
   * Int.typeName // 'Int'
   * Person.typeName // 'Person'
   * ```
   */
  typeName: string;
  /**
   * Return `true` if the given value is an instance of the class.
   *
   * @example
   * ```ts
   * const StringType: Type<string> = {
   *   typeName: 'string',
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
