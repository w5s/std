import type { Array } from '../Array.js';
import type { Int } from '../Int.js';
import { empty } from './empty.js';

/**
 * Returns the items of an array that meet the condition specified in a callback function.
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3, 4];
 * const isEven = (_: number) => _ % 2 === 0;
 * Array.filter(array, isEven); // [2, 4]
 * ```
 * @param array - The array object
 * @param predicate - A function that accepts up to three arguments. The filter method calls the predicate function one time for each item in the array.
 */
export function filter<Item, RefinedItem extends Item>(
  array: Array<Item>,
  predicate: (item: Item) => item is RefinedItem,
): Array<RefinedItem>;
export function filter<Item>(
  array: Array<Item>,
  predicate: (item: Item, index: Int, array: Array<Item>) => boolean,
): Array<Item>;
export function filter<Item>(array: Array<Item>, predicate: (item: Item, index: Int, array: Array<Item>) => boolean) {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    return array;
  }
  const returnValue = array.filter(
    // @ts-ignore number !== Int
    predicate,
  );
  const returnValueLength = returnValue.length;
  return returnValueLength === 0 ? empty() : returnValueLength === arrayLength ? array : returnValue;
}
