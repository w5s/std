import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import { _copySlice } from './_copySlice.js';

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
 * @param array - The array object
 * @param mapFn - A function that accepts up to three arguments. The map method calls the function one time for each item in the array and returns an array that will be concatenated.
 */
export function flatMap<FromItem, ToItem>(
  array: Array<FromItem>,
  mapFn: (item: FromItem, index: Int, array: Array<FromItem>) => Array<ToItem>,
): Array<ToItem> {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    return array as Array<never>;
  }
  const returnValue: globalThis.Array<ToItem> = [];
  let returnValueIndex = 0;
  let index = 0;

  while (index < arrayLength) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const part = mapFn(array[index]!, index as Int, array);
    const partLength = part.length;
    _copySlice(returnValue, returnValueIndex, part, 0, partLength);
    returnValueIndex += partLength;
    index += 1;
  }

  return returnValue;
}
