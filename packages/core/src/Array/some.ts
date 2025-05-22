import type { Array } from '../Array.js';
import type { Int } from '../Int.js';

/**
 * Determines whether the specified callback function returns true for any item of an array.
 *
 * @example
 * ```typescript
 * const isEven = (_: number) => _ % 2 === 0;
 * Array.some([1, 2, 3], isEven); // true
 * Array.some([1, 3], isEven); // false
 * Array.some([], (value) => true); // false
 * ```
 * @category Predicate
 * @param self - The array object
 * @param predicate - The predicate function is called until it returns `true`, or until the end of the array.
 */
export function some<Item>(
  self: Array<Item>,
  predicate: (item: Item, index: Int, array: Array<Item>) => boolean,
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return (self as any).some(predicate);
}
