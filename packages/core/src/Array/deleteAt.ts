import type { Array } from '../Array.js';
import { empty } from './empty.js';
import { splice } from './splice.js';

/**
 * Return an array excluding the item at the `index`
 *
 * @example
 * ```typescript
 * Array.deletedAt([1, 2, 3, 4], 1);// [1, 3, 4]
 * ```
 * @param array - The array object
 * @param index - The position of the deleted item in the array
 */
export function deleteAt<Item>(array: Array<Item>, index: number): Array<Item> {
  const arrayLength = array.length;
  return arrayLength === 0 || !(index >= 0 && index <= arrayLength - 1)
    ? array
    : arrayLength - 1 === 0
      ? empty()
      : splice(array, index, 1);
}
