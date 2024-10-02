import type { Array } from '../Array.js';
import type { Int } from '../Int.js';

/**
 * Calls the specified callback function for all the items in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 *
 * @example
 * ```typescript
 * const array = ['foo', 'bar', 'baz'];
 * const concat = (_: string, item: string) => _ + ':' + item;
 * Array.reduce(array, concat, '$') // '$foo:bar:baz'
 * ```
 * @param array - The array object
 * @param reduceFn - A function that accepts up to four arguments. The reduce method calls the function one time for each item in the array.
 * @param initialValue - Initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 */
export function reduce<Item, ReturnValue>(
  array: Array<Item>,
  reduceFn: (previousValue: ReturnValue, currentItem: Item, currentIndex: Int, array: Array<Item>) => ReturnValue,
  initialValue: ReturnValue,
): ReturnValue {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (array as any).reduce(reduceFn, initialValue);
}
