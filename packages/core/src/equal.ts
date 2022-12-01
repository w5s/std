export interface Equal<T> {
  /**
   * Return `true` if `left` is equal to `right`
   *
   * @example
   * ```ts
   * const booleanEqual: Equal<boolean>;
   * booleanEqual['=='](true, true); //true;
   * booleanEqual['=='](true, false); //false;
   * ```
   * @param left - the left operand
   * @param right - the right operand
   */
  ['=='](left: T, right: T): boolean;
}
