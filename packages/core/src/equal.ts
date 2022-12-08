export interface Equal<T> {
  /**
   * "Not equal to" operator
   *
   * @example
   * ```ts
   * const NumberEqual: Equal<number>;
   * NumberEqual['!='](0, 1); // true
   * NumberEqual['!='](0, 0); // false
   * ```
   */
  readonly '!=': (left: T, right: T) => boolean;
  /**
   * "Equal to" operator
   *
   * @example
   * ```ts
   * const NumberEqual: Equal<number>;
   * NumberEqual['=='](0, 0); // true
   * NumberEqual['=='](0, 1); // false
   * ```
   */
  readonly '==': (left: T, right: T) => boolean;
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
export function Equal<T>(properties: { '==': (left: T, right: T) => boolean }): Equal<T> {
  const equals = properties['=='];
  const notEquals = (left: T, right: T) => !equals(left, right);
  return {
    '==': equals,
    '!=': notEquals,
  };
}
