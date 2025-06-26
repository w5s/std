import type { Ordering } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Return a sorted array using `compareFn`
 *
 * @example
 * ```typescript
 * Array.sort([11, 2, 22, 1], Number.compare);// [1, 2, 11, 22]
 * ```
 * @param self - The array object
 * @param compareFn - Function used to determine the order of the items. It is expected to return
 * a negative value if first argument is less than second argument, zero if they're equal and a positive
 * value otherwise.
 */
export function sort<Item>(self: Array<Item>, compareFn: (a: Item, b: Item) => Ordering) {
  return self.length === 0 ? self : self.slice().sort(compareFn);
}
