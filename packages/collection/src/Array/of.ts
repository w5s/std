import type { Array } from '../Array.js';

/**
 * Returns a new array from a set of items.
 *
 * @example
 * ```typescript
 * Array.of(1, 2, 3);// [1, 2, 3]
 * ```
 * @category Constructor
 * @param items - A set of items to include in the new array object.
 */
export function of<Item>(...items: Item[]): Array<Item> {
  return items;
}
