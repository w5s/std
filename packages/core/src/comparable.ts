import type { Equal } from './equal.js';

/**
 * Module interface for values that have total order
 */
export interface Comparable<T> extends Equal<T> {
  /**
   * Return a number that represents comparison
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const sorted = [3, 1, 1].sort(TCompare.compare);
   * ```
   * @category Comparator
   */
  compare(this: void, left: T, right: T): number;
  /**
   * "Less than or equal to" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare['<='](smallerT, smallerT); // true
   * TCompare['<='](smallerT, greaterT); // true
   * TCompare['<='](greaterT, smallerT); // false
   * ```
   * @category Comparator
   */
  '<='(this: void, left: T, right: T): boolean;
  /**
   * "Less than" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare['<'](smallerT, smallerT); // false
   * TCompare['<'](smallerT, greaterT); // true
   * TCompare['<'](greaterT, smallerT); // false
   * ```
   * @category Comparator
   */
  '<'(this: void, left: T, right: T): boolean;
  /**
   * "Greater than or equal to" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare['>='](smallerT, smallerT); // true
   * TCompare['>='](smallerT, greaterT); // false
   * TCompare['>='](greaterT, smallerT); // true
   * ```
   * @category Comparator
   */
  '>='(this: void, left: T, right: T): boolean;
  /**
   * "Greater than" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare['>'](smallerT, smallerT); // false
   * TCompare['>'](smallerT, greaterT); // false
   * TCompare['>'](greaterT, smallerT); // true
   * ```
   * @category Comparator
   */
  '>'(this: void, left: T, right: T): boolean;
  /**
   * "minimum" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare.min(smallerT, greaterT); // smallerT
   * ```
   * @category Comparator
   */
  min(this: void, left: T, right: T): T;
  /**
   * "maximum" operator
   *
   * @example
   * ```ts
   * type T;
   * const TCompare: Comparable<T>;
   * const smallerT: T;
   * const greaterT: T;
   * TCompare.max(smallerT, greaterT); // greaterT
   * ```
   * @category Comparator
   */
  max(this: void, left: T, right: T): T;
}

/**
 * Construct Comparable instance
 *
 * @example
 * ```ts
 * const NumberComparable = Comparable({
 *   compare: (left, right) => left - right,
 * });
 * NumberComparable['=='](0, 0); // true
 * NumberComparable['<'](0, 1); // true
 * NumberComparable['>'](0, 1); // false
 * ```
 * @category Functor
 * @param properties
 * @param properties.compare - the comparison function
 */
export function Comparable<T>(properties: { compare: (left: T, right: T) => number }): Comparable<T> {
  const { compare } = properties;
  const equals = (left: T, right: T) => compare(left, right) === 0;
  return {
    compare,
    equals,
    '==': equals,
    '!=': (left: T, right: T) => compare(left, right) !== 0,
    '<': (left: T, right: T) => compare(left, right) < 0,
    '<=': (left: T, right: T) => compare(left, right) <= 0,
    '>': (left: T, right: T) => compare(left, right) > 0,
    '>=': (left: T, right: T) => compare(left, right) >= 0,
    min: (left: T, right: T) => (compare(left, right) <= 0 ? left : right),
    max: (left: T, right: T) => (compare(left, right) > 0 ? left : right),
  };
}
