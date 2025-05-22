import type { Array } from '../Array.js';
import { splice } from './splice.js';

/**
 * Replace `item` at the `index` in the array
 *
 * @example
 * ```typescript
 * Array.setAt(['a', 'b', 'c'], 1, '$');// ['a', '$', 'c']
 * ```
 * @param self - The array object
 * @param index - The position of the updated item in the array
 * @param item - The item to insert
 */
export function setAt<Item>(self: Array<Item>, index: number, item: Item): Array<Item> {
  return self.length === 0 || index >= self.length || index < -self.length || self[index] === item
    ? self
    : splice(self, index, 1, item);
}
