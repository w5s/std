import type { Array } from '../Array.js';
import type { Option } from '../Option.js';
import { empty } from './empty.js';

/**
 * Returns a section of an array.
 *
 * @example
 * ```typescript
 * Array.sort([1, 2, 3, 4], 1, 3);// [2, 3]
 * ```
 * @param array - The array object
 * @param start - The beginning of the specified portion of the array.
 * @param end - The end of the specified portion of the array. This is exclusive of the item at the index `end`.
 */
export function slice<Item>(array: Array<Item>, start?: Option<number>, end?: Option<number>): Array<Item> {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    return array;
  }
  const sliceArray = array.slice(start, end);
  const sliceArrayLength = sliceArray.length;
  if (sliceArrayLength === 0) {
    return empty();
  }
  if (sliceArrayLength === arrayLength) {
    return array;
  }
  return sliceArray;
}
