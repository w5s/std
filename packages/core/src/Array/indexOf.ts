import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import type { Option } from '../Option.js';

/**
 * Returns the index of the first occurrence of `searchItem` in an array.
 *
 * @example
 * ```typescript
 * Array.indexOf(['a', '', 'a'], 'a'); // Option.Some(0)
 * Array.indexOf(['a', '', 'a',  '', 'a'], 'a', 1); // Option.Some(2)
 * Array.indexOf(['a', 'b'], 'absent'); // Option.Some(
 * ```
 * @param array - The array object
 * @param searchItem - The item to locate in the array.
 * @param fromIndex - The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
 */
export function indexOf<Item>(array: Array<Item>, searchItem: Item, fromIndex?: number): Option<Int> {
  const arrayLength = array.length;

  if (arrayLength > 0) {
    // eslint-disable-next-line no-self-compare
    if (searchItem === searchItem) {
      const indexNumber = array.indexOf(searchItem, fromIndex);
      return indexNumber < 0 ? undefined : (indexNumber as Int);
    }
    // NaN
    let index = fromIndex == null ? 0 : fromIndex < 0 ? Math.max(arrayLength + fromIndex, 0) : fromIndex;
    while (index < arrayLength) {
      const value = array[index];
      // eslint-disable-next-line no-self-compare
      if (value !== value) {
        return index as Int;
      }

      index += 1;
    }
  }

  return undefined;
}
