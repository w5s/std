/* eslint-disable ts/ban-ts-comment */
import type { PartialKeys } from '@w5s/core-type';

import type { Int } from './Int.js';
import type { Option } from './Option.js';
import type { Range } from './Range.js';

/**
 * A type Indexable is a type with values that can be indexed by a number.
 */
export interface Indexable<T, Index extends bigint | number = number> {
  /**
   * Returns the value at the index
   *
   * @category Indexable
   * @param index
   */
  at(index: Index): Option<T>;

  /**
   * Returns the integer index of a value
   *
   * @category Indexable
   * @param value
   */
  indexOf(value: T): Option<Index>;

  /**
   * Index type
   *
   * @category Indexable
   */
  indexType: Index extends number ? 'number' : Index extends bigint ? 'bigint' : never;

  /**
   * Returns an Iterable starting from `start` to `end`.
   * If `start` or `end` is not in range then returns an empty iterable.
   *
   * @category Indexable
   * @param start the start of the range
   * @param end the end of the range
   */
  range(start: T, end: T): Range<T>;

  /**
   * Returns the size of a range.
   * If `start` or `end` is not in range then returns 0.
   *
   * @category Indexable
   * @param start the start of the range
   * @param end the end of the range
   */
  rangeSize(start: T, end: T): Index;
}
export function Indexable<T, Index extends bigint | number = number>(
  properties: Indexable.Parameters<T, Index>,
): Indexable<T, Index> {
  const { at, indexOf, indexType, range, rangeSize } = properties;
  const zero = indexType === 'bigint' ? 0n : (0 as Int);
  const one = indexType === 'bigint' ? 1n : (1 as Int);
  return {
    at,
    indexOf,
    indexType,
    range:
      range ??
      ((rangeStart, rangeEnd) => ({
        rangeEnd,
        rangeStart,
        * [Symbol.iterator]() {
          const startIndex = indexOf(rangeStart);
          const endIndex = indexOf(rangeEnd);
          if (startIndex != null && endIndex != null) {
            if (startIndex <= endIndex) {
              // @ts-ignore

              // eslint-disable-next-line ts/restrict-plus-operands
              for (let index = startIndex; index <= endIndex; index += one) {
                const value = at(index);
                if (value != null) {
                  yield value;
                }
              }
            } else {
              // @ts-ignore

              for (let index = startIndex; index >= endIndex; index -= one) {
                const value = at(index);
                if (value != null) {
                  yield value;
                }
              }
            }
          }
        },
      })),
    rangeSize:
      rangeSize ??
      ((start, end) => {
        const startIndex = indexOf(start);
        const endIndex = indexOf(end);
        // @ts-ignore

        // eslint-disable-next-line ts/no-unsafe-return, ts/restrict-plus-operands
        return startIndex == null || endIndex == null ? zero : endIndex - startIndex + one;
      }),
  };
}
export namespace Indexable {
  export interface Parameters<T, Index extends bigint | number> extends PartialKeys<
    Indexable<T, Index>,
    'range' | 'rangeSize'
  > {}
}
