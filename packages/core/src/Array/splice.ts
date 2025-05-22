import type { Array } from '../Array.js';
import { empty } from './empty.js';

/**
 * Add `item` at the `index` in the array
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c', 'd', 'e'];
 * // Remove 2 items starting at index 1
 * splice(array, 1, 2); // ['a', 'd', 'e']
 * // Insert items at index 2
 * splice(array, 2, 0, 'x', 'y'); // ['a', 'b', 'x', 'y', 'c', 'd', 'e']
 * // Replace items at index 1
 * splice(array, 1, 2, 'u', 'v'); // ['a', 'u', 'v', 'd', 'e']
 * ```
 * @param self - The array object
 * @param start - The position of the inserted item in the array
 * @param deleteCount - The number of deleted items
 */
export function splice<Item>(self: Array<Item>, start: number, deleteCount: number, ...items: Item[]): Array<Item> {
  const result = self.toSpliced(start, deleteCount, ...items);
  return result.length === 0 ? empty() : result;
}
