import type { Int, Option } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Returns the value of the first element in the array where predicate is true, and Option.None
 * otherwise.
 *
 * @example
 * ```typescript
 * Array.find(['aa', 'ab', 'abc'], (value) => (value[1] === 'b'));// Option.Some('ab')
 * Array.find(['a', 'b', 'a'], (value) => false);// Option.None
 * ```
 * @param self - The array object
 * @param predicate - find calls predicate once for each element of the array, in ascending
 * order, until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns Option.None.
 */
export function find<Item, RefinedItem extends Item>(
  self: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => value is RefinedItem,
): Option<RefinedItem>;
export function find<Item>(
  self: Array<Item>,
  predicate: (value: Item, index: Int, array: Array<Item>) => boolean,
): Option<Item>;
export function find<Item>(self: Array<Item>, predicate: (value: Item, index: Int, array: Array<Item>) => boolean) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (self as any).find(predicate);
}
