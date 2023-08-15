export interface Equal<T> {
  /**
   * Alias to '=='
   *
   * @example
   * ```ts
   * const NumberEqual: Equal<number>;
   * NumberEqual[Equal.equals](0, 1); // true
   * NumberEqual[Equal.equals](0, 0); // false
   * ```
   * @category Comparator
   */
  equals(this: void, left: T, right: T): boolean;
  /**
   * "Not equal to" operator
   *
   * @example
   * ```ts
   * const NumberEqual: Equal<number>;
   * NumberEqual['!='](0, 1); // true
   * NumberEqual['!='](0, 0); // false
   * ```
   * @category Comparator
   */
  '!='(this: void, left: T, right: T): boolean;
  /**
   * "Equal to" operator
   *
   * @example
   * ```ts
   * const NumberEqual: Equal<number>;
   * NumberEqual['=='](0, 0); // true
   * NumberEqual['=='](0, 1); // false
   * ```
   * @category Comparator
   */
  '=='(this: void, left: T, right: T): boolean;
}

/**
 * Equal module constructor
 *
 * @example
 * ```ts
 * const NumberEqual = Equal<number>({
 *   '==': (left, right) => left === right,
 * });
 * NumberEqual['=='](0, 0); // true;
 * NumberEqual['=='](0, 1); // false;
 * NumberEqual['!='](0, 0); // false;
 * NumberEqual['!='](0, 1); // true;
 * ```
 * @category Functor
 */
export function Equal<T>(properties: { equals: (left: T, right: T) => boolean }): Equal<T> {
  const equals = (left: T, right: T) => properties.equals(left, right);
  const notEquals = (left: T, right: T) => !properties.equals(left, right);
  return {
    equals: properties.equals,
    '==': equals,
    '!=': notEquals,
  };
}
