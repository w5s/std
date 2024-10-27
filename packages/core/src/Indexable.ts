import type { PartialKeys } from '@w5s/core-type';
import type { Int } from './Int.js';

/**
 * A type Indexable is a type with values that can be indexed by a number.
 */
export interface Indexable<T, Index = Int> {
  /**
   * Returns the value at the index
   *
   * @param index
   */
  at(index: Index): T;
  /**
   * Returns the integer index of a value
   *
   * @param value
   */
  indexOf(value: T): Index;
  /**
   * Returns the size of a range
   *
   * @param start - the start of the range
   * @param end - the end of the range
   */
  rangeSize(start: T, end: T): Index;
  /**
   * Returns an Iterable starting from `start` to `end`
   *
   * @param start - the start of the range
   * @param end - the end of the range
   */
  range(start: T, end: T): Range<T>;
}
export function Indexable<T>(properties: Indexable.Parameters<T>): Indexable<T> {
  const {
    indexOf,
    at,
    rangeSize = (start, end) => (indexOf(end) - indexOf(start) + 1) as Int,
    range = function* (start, end) {
      const startIndex = indexOf(start) as number;
      const endIndex = indexOf(end) as number;
      for (let index = startIndex; index <= endIndex; index += 1) {
        yield at(index as Int);
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
  export interface Parameters<T> extends PartialKeys<Indexable<T>, 'rangeSize' | 'range'> {}
}

export interface Range<T> extends Iterable<T> {}
