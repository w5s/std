import type { Int } from '@w5s/core';
import type { Array } from '../Array.js';

/**
 * Calls the specified callback function for all the items in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 *
 * @example
 * ```typescript
 * const array = ['foo', 'bar', 'baz'];
 * const concat = (_: string, item: string) => _ + ':' + item;
 * Array.reduceRight(array, concat, '$') // '$baz:bar:foo'
 * ```
 * @param self - The array object
 * @param reduceFn - A function that accepts up to four arguments. The reduce method calls the function one time for each item in the array.
 * @param initialValue - Initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 */
export function reduceRight<Item, ReturnValue>(
  self: Array<Item>,
  reduceFn: (previousValue: ReturnValue, currentItem: Item, currentIndex: Int, array: Array<Item>) => ReturnValue,
  initialValue: ReturnValue,
): ReturnValue {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (self as any).reduceRight(reduceFn, initialValue);
}
