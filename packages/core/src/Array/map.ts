import type { Array } from '../Array.js';
import type { Int } from '../Int.js';

/**
 * Calls a defined callback function on each item of an array, and returns an array that contains the results.
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3];
 * const double = (_: number) => _ * 2;
 * Array.map(array, double); // [2, 4, 6]
 * ```
 * @param self - The array object
 * @param mapFn - A function that accepts up to three arguments. The map method calls the function one time for each item in the array.
 */
export function map<FromItem, ToItem>(
  self: Array<FromItem>,
  mapFn: (item: FromItem, index: Int, array: Array<FromItem>) => ToItem,
): Array<ToItem> {
  if (self.length === 0) {
    return self as Array<never>;
  }
  let changed = false;
  const returnValue = self.map((previousValue, index, thisArray) => {
    const nextValue = mapFn(previousValue, index as Int, thisArray);
    if (!changed && (nextValue as any) !== previousValue) {
      changed = true;
    }
    return nextValue;
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return changed ? returnValue : (self as unknown as Array<ToItem>);
}
