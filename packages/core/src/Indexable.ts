/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PartialKeys } from '@w5s/core-type';
import type { Int } from './Int.js';
import type { Option } from './Option.js';
import type { Range } from './Range.js';

/**
 * A type Indexable is a type with values that can be indexed by a number.
 */
export interface Indexable<T, Index extends number | bigint = number> {
  /**
   * Index type
   */
  indexType: Index extends number ? 'number' : Index extends bigint ? 'bigint' : never;
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
export function Indexable<T, Index extends number | bigint = number>(
  properties: Indexable.Parameters<T, Index>,
): Indexable<T, Index> {
  const { indexType, indexOf, at, rangeSize, range } = properties;
  const zero = indexType === 'bigint' ? 0n : (0 as Int);
  const one = indexType === 'bigint' ? 1n : (1 as Int);
  return {
    at,
    indexOf,
    indexType,
    rangeSize:
      rangeSize ??
      ((start, end) => {
        const startIndex = indexOf(start);
        const endIndex = indexOf(end);
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/restrict-plus-operands
        return startIndex == null || endIndex == null ? zero : endIndex - startIndex + one;
      }),
    range:
      range ??
      ((rangeStart, rangeEnd) => ({
        rangeStart,
        rangeEnd,
        *[Symbol.iterator]() {
          const startIndex = indexOf(rangeStart);
          const endIndex = indexOf(rangeEnd);
          if (startIndex != null && endIndex != null) {
            if (startIndex <= endIndex) {
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
  };
}
export namespace Indexable {
  export interface Parameters<T, Index extends number | bigint>
    extends PartialKeys<Indexable<T, Index>, 'rangeSize' | 'range'> {}
}
