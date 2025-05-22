import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import type { Option } from '../Option.js';

/**
 * Returns the index of the first element in the array where predicate is true, and Option.None
 * otherwise.
 *
 * @example
 * ```typescript
 * Array.findIndex(['a', 'b', 'a'], (value) => (value === 'a'));// Option.Some(0)
 * Array.findIndex(['a', 'b', 'a'], (value) => false);// Option.None
 * ```
 * @param self - The array object
 * @param predicate - find calls predicate once for each element of the array, in ascending
 * order, until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns Option.None.
 */
export function findIndex<Item>(
  self: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => boolean,
): Option<Int> {
  const indexNumber = self.findIndex(
    // @ts-ignore number !== Int
    predicate,
  );
  return indexNumber === -1 ? undefined : (indexNumber as Int);
}
