import type { Option } from '../Option.js';

/**
 * Return an item at the `index` position
 *
 * @example
 * ```typescript
 * const array = ['foo', 'bar', 'baz'];
 * Array.at(array, 1) // Option.Some('bar')
 * Array.at(array, -1) //  Option.Some('baz') i.e. the last
 * Array.at(array, 99) // Option.None
 * ```
 * @category Accessor
 * @param array - The array object
 * @param index - The zero based position
 */
export function at<Item>(array: ArrayLike<Item>, index: number): Option<Item> {
  return array[index < 0 ? index + array.length : index] ?? undefined;
}
