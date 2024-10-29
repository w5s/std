import type { PartialKeys } from '@w5s/core-type';
import type { Int } from './Int.js';
import type { Option } from './Option.js';

/**
 * A type Indexable is a type with values that can be indexed by a number.
 */
export interface Indexable<T, Index extends number | bigint = number> {
  /**
   * Returns the value at the index
   *
   * @param index
   */
  at(index: Index): Option<T>;
  /**
   * Returns the integer index of a value
   *
   * @param value
   */
  indexOf(value: T): Option<Index>;
  /**
   * Returns the size of a range.
   * If `start` or `end` is not in range then returns 0.
   *
   * @param start - the start of the range
   * @param end - the end of the range
   */
  rangeSize(start: T, end: T): Index;
  /**
   * Returns an Iterable starting from `start` to `end`.
   * If `start` or `end` is not in range then returns an empty iterable.
   *
   * @param start - the start of the range
   * @param end - the end of the range
   */
  range(start: T, end: T): Range<T>;
}
export function Indexable<T>(properties: Indexable.Parameters<T, number>): Indexable<T, number> {
  const {
    indexOf,
    at,
    rangeSize = (start, end) => {
      const startIndex = indexOf(start);
      const endIndex = indexOf(end);
      return startIndex == null || endIndex == null ? (0 as Int) : ((endIndex - startIndex + 1) as Int);
    },
    // eslint-disable-next-line func-names
    range = function* (start, end) {
      const startIndex = indexOf(start);
      const endIndex = indexOf(end);
      if (startIndex != null && endIndex != null) {
        for (let index = startIndex; index <= endIndex; index += 1) {
          const value = at(index as Int);
          if (value != null) {
            yield value;
          }
        }
      }
    },
  } = properties;
  return {
    at,
    indexOf,
    rangeSize,
    range,
  };
}
export namespace Indexable {
  export interface Parameters<T, Index extends number | bigint>
    extends PartialKeys<Indexable<T, Index>, 'rangeSize' | 'range'> {}
}

export interface Range<T> extends Iterable<T> {}
