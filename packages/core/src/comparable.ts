import type { Equal } from './equal.js';

export interface Comparable<T> extends Equal<T> {
  /**
   * Return a number that represents comparison
   *
   * @example
   * ```ts
   * const NumberCompare: Comparable<number>;
   * const sorted = [3, 1, 1].sort(NumberCompare.compare);
   * ```
   */
  readonly compare: (left: T, right: T) => number;
  /**
   * "Less than or equal to" operator
   *
   * @example
   * ```ts
   * const NumberCompare: Comparable<number>;
   * NumberCompare['<='](0, 0); // true
   * NumberCompare['<='](0, 1); // true
   * NumberCompare['<='](0, -1); // false
   * ```
   */
  readonly '<=': (left: T, right: T) => boolean;
  /**
   * "Less than" operator
   *
   * @example
   * ```ts
   * const NumberCompare: Comparable<number>;
   * NumberCompare['<'](0, 0); // false
   * NumberCompare['<'](0, 1); // true
   * NumberCompare['<'](0, -1); // false
   * ```
   */
  readonly '<': (left: T, right: T) => boolean;
  /**
   * "Greater than or equal to" operator
   *
   * @example
   * ```ts
   * const NumberCompare: Comparable<number>;
   * NumberCompare['>='](0, 0); // true
   * NumberCompare['>='](0, 1); // false
   * NumberCompare['>='](0, -1); // true
   * ```
   */
  readonly '>=': (left: T, right: T) => boolean;
  /**
   * "Greater than" operator
   *
   * @example
   * ```ts
   * const NumberCompare: Comparable<number>;
   * NumberCompare['>'](0, 0); // false
   * NumberCompare['>'](0, 1); // false
   * NumberCompare['>'](0, -1); // true
   * ```
   */
  readonly '>': (left: T, right: T) => boolean;
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
 */
export function Comparable<T>(properties: { compare: (left: T, right: T) => number }): Comparable<T> {
  const { compare } = properties;
  return {
    compare,
    '==': (left, right) => compare(left, right) === 0,
    '!=': (left, right) => compare(left, right) !== 0,
    '<': (left, right) => compare(left, right) < 0,
    '<=': (left, right) => compare(left, right) <= 0,
    '>': (left, right) => compare(left, right) > 0,
    '>=': (left, right) => compare(left, right) >= 0,
  };
}
export namespace Comparable {}
