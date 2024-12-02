import type { Array } from '../Array.js';
import { splice } from './splice.js';

/**
 * Add `item` at the `index` in the array
 *
 * @example
 * ```typescript
 * Array.insertAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'b', 'c']
 * ```
 * @param array - The array object
 * @param index - The position of the inserted item in the array
 * @param item - The item to insert
 */
export function insertAt<Item>(array: Array<Item>, index: number, item: Item): Array<Item> {
  const arrayLength = array.length;
  return index >= 0 && index <= arrayLength ? splice(array, index, 0, item) : array;
}
