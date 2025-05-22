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
 * @param self - The array object
 * @param index - The position of the deleted item in the array
 */
export function deleteAt<Item>(self: Array<Item>, index: number): Array<Item> {
  const arrayLength = self.length;
  return arrayLength === 0 || !(index >= 0 && index <= arrayLength - 1)
    ? self
    : arrayLength - 1 === 0
      ? empty()
      : splice(self, index, 1);
}
