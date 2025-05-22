import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import { map } from './map.js';

/**
 * Return a reversed array
 *
 * @example
 * ```typescript
 * Array.reverse([1, 2, 3]);// [3, 2, 1]
 * ```
 * @param self - The array object
 */
export function reverse<Item>(self: Array<Item>): Array<Item> {
  return map(self, reverseFunction);
}
function reverseFunction<Item>(_: Item, index: Int, array: Array<Item>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return array[array.length - 1 - index]!;
}
