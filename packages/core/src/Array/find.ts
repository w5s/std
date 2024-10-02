import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import type { Option } from '../Option.js';

/**
 * Returns the value of the first element in the array where predicate is true, and Option.None
 * otherwise.
 *
 * @example
 * ```typescript
 * Array.find(['aa', 'ab', 'abc'], (value) => (value[1] === 'b'));// Option.Some('ab')
 * Array.find(['a', 'b', 'a'], (value) => false);// Option.None
 * ```
 * @param array - The array object
 * @param predicate - find calls predicate once for each element of the array, in ascending
 * order, until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns Option.None.
 */
export function find<Item, RefinedItem extends Item>(
  array: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => value is RefinedItem,
): Option<RefinedItem>;
export function find<Item>(
  array: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => boolean,
): Option<Item>;
export function find<Item>(array: Array<Item>, predicate: (value: Item, index: Int, array: Array<Item>) => boolean) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (array as any).find(predicate);
}
