import type { Array } from '../Array.js';
import { splice } from './splice.js';

/**
 * Replace `item` at the `index` in the array
 *
 * @example
 * ```typescript
 * Array.setAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'c']
 * ```
 * @param array - The array object
 * @param index - The position of the updated item in the array
 * @param item - The item to insert
 */
export function setAt<Item>(array: Array<Item>, index: number, item: Item): Array<Item> {
  return array.length === 0 || index >= array.length || index < -array.length || array[index] === item
    ? array
    : splice(array, index, 1, item);
}
