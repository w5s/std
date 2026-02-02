/**
 * Equal module constructor
 *
 * @example
 * ```typescript
 * type T;
 * const TEqual = Equal<T>({
 *   '==': (left, right) => { /* ... *\/ },
 * });
 * const value: T;
 *
 * TEqual['=='](value, value); // true;
 * ```
 * @category Functor
 */
export function Equal<T>(properties: Equal.Parameters<T>): Equal.Module<T> {
  const equals = (left: T, right: T) => properties.equals(left, right);
  const notEquals = (left: T, right: T) => !properties.equals(left, right);
  return {
    equals: properties.equals,
    '==': equals,
    '!=': notEquals,
  };
}

export namespace Equal {
  export type Parameters<T> = {
    equals: (left: T, right: T) => boolean;
  };

  export interface Interface<T> {
    /**
     * Alias to '=='
     *
     * @example
     * ```typescript
     * type T = // ...
     * const TEqual: Equal<T>;
     * TEqual.equals(value, value); // true
     * TEqual.equals(value, otherValue); // false
     * ```
     * @category Comparator
     */
    equals(this: void, left: T, right: T): boolean;
  }

  /**
   * Module interface for values that have equivalence relation
   */
  export interface Module<T> extends Interface<T> {
    /**
     * "Not equal to" operator
     *
     * @example
     * ```typescript
     * const TEqual: Equal<T>;
     * TEqual['!='](value, otherValue); // true
     * TEqual['!='](value, value); // false
     * ```
     * @category Comparator
     */
    '!='(this: void, left: T, right: T): boolean;
    /**
     * "Equal to" operator
     *
     * @example
     * ```typescript
     * type T = // ...
     * const TEqual: Equal<T>;
     * TEqual['=='](value, value); // true
     * TEqual['=='](value, otherValue); // false
     * ```
     * @category Comparator
     */
    '=='(this: void, left: T, right: T): boolean;
  }
}
