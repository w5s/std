import type { Array } from '../Array.js';
import { _copySlice } from './_copySlice.js';

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
  const arrayIndex = index;
  if (!(arrayIndex >= 0 && arrayIndex <= arrayLength)) {
    return array;
  }
  const returnValue = new globalThis.Array<Item>(arrayLength + 1);

  // Copy before index
  _copySlice(returnValue, 0, array, 0, index);
  // Add at the index
  returnValue[index] = item;
  // Copy after index
  _copySlice(returnValue, index + 1, array, index, arrayLength);

  return returnValue;
}
