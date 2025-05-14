import type { Array } from '../Array.js';
import type { Ordering } from '../Ordering.js';

/**
 * Return a sorted array using `compareFn`
 *
 * @example
 * ```typescript
 * Array.sort([11, 2, 22, 1], Number.compare);// [1, 2, 11, 22]
 * ```
 * @param array - The array object
 * @param compareFn - Function used to determine the order of the items. It is expected to return
 * a negative value if first argument is less than second argument, zero if they're equal and a positive
 * value otherwise.
 */
export function sort<Item>(array: Array<Item>, compareFn: (a: Item, b: Item) => Ordering) {
  return array.length === 0 ? array : array.slice().sort(compareFn);
}
