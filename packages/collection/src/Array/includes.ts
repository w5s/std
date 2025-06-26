import type { Array } from '../Array.js';
import { indexOf } from './indexOf.js';

/**
 * Determines whether an array includes a certain item, returning true or false as appropriate.
 *
 * @example
 * ```typescript
 * Array.includes(['a', '', 'a'], 'a'); // true
 * Array.includes(['a', '', 'a',  '', 'a'], 'a', 1); // true
 * Array.includes(['a', 'b'], 'absent'); // false
 * ```
 * @category Predicate
 * @param self - The array object
 * @param searchItem - The item to search for.
 * @param fromIndex - The position in this array at which to begin searching for searchItem.
 */
export function includes<Item>(self: Array<Item>, searchItem: Item, fromIndex?: number): boolean {
  return indexOf(self, searchItem, fromIndex) !== undefined;
}
