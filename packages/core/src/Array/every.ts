import type { Array } from '../Array.js';
import type { Int } from '../Int.js';

/**
 * Determines whether all the members of an array satisfy the specified test.
 *
 * @example
 * ```typescript
 * const isEven = (_: number) => _ % 2 === 0;
 * Array.every([1, 2, 3], isEven); // false
 * Array.every([2, 4], isEven); // true
 * Array.every([], (value) => false); // true
 * ```
 * @category Predicate
 * @param array - The array object
 * @param predicate - The predicate function is called until it returns `false`, or until the end of the array.
 */
export function every<Item, RefinedItem extends Item>(
  array: Array<Item>,
  predicate: (item: Item, index: Int, array: Array<Item>) => item is RefinedItem
): array is Array<RefinedItem>;
export function every<Item>(
  array: Array<Item>,
  predicate: (item: Item, index: Int, array: Array<Item>) => boolean
): boolean;
export function every<Item>(
  array: Array<Item>,
  predicate: (item: Item, index: Int, array: Array<Item>) => boolean
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (array as any).every(predicate);
}
