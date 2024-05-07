import type { Array } from '../Array.js';

/**
 * Replace `item` at the `index` in the array
 *
 * @example
 * ```typescript
 * Array.updateAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'c']
 * ```
 * @param array - The array object
 * @param index - The position of the updated item in the array
 * @param item - The item to insert
 */
export function updateAt<Item>(array: Array<Item>, index: number, item: Item): Array<Item> {
  const arrayLength = array.length;
  if (arrayLength === 0 || !(index >= 0 && index <= arrayLength - 1) || array[index] === item) {
    return array;
  }
  const returnValue = array.slice();
  // Set at the index
  returnValue[index] = item;

  return returnValue;
}
