import type { Array } from '../Array.js';
import { _copySlice } from './_copySlice.js';
import { empty } from './empty.js';

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
  const arrayIndex = index;
  if (arrayLength === 0 || !(arrayIndex >= 0 && arrayIndex <= arrayLength - 1)) {
    return array;
  }
  const returnValueLength = arrayLength - 1;
  if (returnValueLength === 0) {
    return empty();
  }
  const returnValue = new globalThis.Array<Item>(returnValueLength);

  // Copy before index
  _copySlice(returnValue, 0, array, 0, index);
  // Skip the index after index
  _copySlice(returnValue, index, array, index + 1, arrayLength);

  return returnValue;
}
