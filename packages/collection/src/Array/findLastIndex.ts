import type { Int, Option } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Returns the index of the last element in the array where predicate is true, and Option.None
 * otherwise.
 *
 * @example
 * ```typescript
 * Array.findLastIndex(['a', 'b', 'a'], (value) => (value === 'a'));// Option.Some(2)
 * Array.findLastIndex(['a', 'b', 'a'], (value) => false);// Option.None
 * ```
 * @param self - The array object
 * @param predicate - find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns Option.None.
 */
export function findLastIndex<Item>(
  self: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => boolean,
): Option<Int> {
  const indexNumber = self.findLastIndex(
    // @ts-ignore number !== Int
    predicate,
  );
  return indexNumber === -1 ? undefined : (indexNumber as Int);
}
