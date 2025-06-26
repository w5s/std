import type { Int } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Calls a defined callback function on each item of an array. Each calls should return an array.
 * The final result is the concatenation of each arrays.
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c'];
 * const concat = (_: string) => [_ + '_1', _ + '_2'];
 * Array.flatMap(array, concat); // ['a_1', 'a_2', 'b_1', 'b_2', 'c_1', 'c_2']
 * ```
 * @param self - The array object
 * @param mapFn - A function that accepts up to three arguments. The map method calls the function one time for each item in the array and returns an array that will be concatenated.
 */
export function flatMap<FromItem, ToItem>(
  self: Array<FromItem>,
  mapFn: (item: FromItem, index: Int, array: Array<FromItem>) => Array<ToItem>,
): Array<ToItem> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return self.length === 0 ? (self as Array<never>) : self.flatMap(mapFn as any);
}
