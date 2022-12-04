export interface Comparable<T> {
  /**
   * Return a number that represents comparison
   */
  readonly compare: (left: T, right: T) => number;
  readonly '!=': (left: T, right: T) => boolean;
  readonly '==': (left: T, right: T) => boolean;
  readonly '<=': (left: T, right: T) => boolean;
  readonly '<': (left: T, right: T) => boolean;
  readonly '>=': (left: T, right: T) => boolean;
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
 * @category Constructor
 * @param properties
 */
export function Comparable<T>(
  properties:
    | { compare: (left: T, right: T) => number }
    | { '<': (left: T, right: T) => boolean; '==': (left: T, right: T) => boolean }
): Comparable<T> {
  if ('compare' in properties) {
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
  const equal = properties['=='];
  const lessThan = properties['<'];

  return {
    compare: (left, right) => (equal(left, right) ? 0 : lessThan(left, right) ? -1 : 1),
    '==': equal,
    '!=': (left, right) => !equal(left, right),
    '<': lessThan,
    '<=': (left, right) => lessThan(left, right) || equal(left, right),
    '>': (left, right) => !(lessThan(left, right) || equal(left, right)),
    '>=': (left, right) => !lessThan(left, right),
  };
}
