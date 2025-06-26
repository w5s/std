import type { Int, Option } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Returns the index of the last occurrence of a specified `searchItem` in an array.
 *
 * @example
 * ```typescript
 * Array.lastIndexOf(['a', 'b', 'a'], 'a') // Option.Some(2)
 * Array.lastIndexOf(['a', 'b', 'a', 'b', 'a'], 'a', 4); // Option.Some(2)
 * Array.lastIndexOf(['a', 'b'], 'absent') // Option.None
 * ```
 * @param self - The array object
 * @param searchItem - The item to locate in the array.
 * @param fromIndex - The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index of the array.
 */
export function lastIndexOf<Item>(self: Array<Item>, searchItem: Item, fromIndex?: number): Option<Int> {
  const arrayLength = self.length;

  if (arrayLength > 0) {
    // eslint-disable-next-line no-self-compare
    if (searchItem === searchItem) {
      // not NaN
      const indexNumber = self.lastIndexOf(searchItem, fromIndex);
      return indexNumber === -1 ? undefined : (indexNumber as Int);
    }
    let index =
      fromIndex == null
        ? arrayLength - 1
        : fromIndex < 0
          ? Math.max(arrayLength + fromIndex, 0)
          : Math.min(fromIndex, arrayLength - 1);
    // NaN
    while (index >= 0) {
      const value = self[index];
      // eslint-disable-next-line no-self-compare
      if (value !== value) {
        return index as Int;
      }

      index -= 1;
    }
  }

  return undefined;
}
