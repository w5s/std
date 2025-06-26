import type { Array } from '../Array.js';
import { isEmpty } from './isEmpty.js';

/**
 * Concatenate all elements of arrays
 * Equivalent to `[...array, ...extension[0], ...extension[1], ...]`,
 *
 * @example
 * ```typescript
 * Array.concat([1, 2], [3, 4], [5, 6]);// [1, 2, 3, 4, 5, 6]
 * ```
 * @param self - The array object
 * @param extensions - The other arrays to append
 */
export function concat<Item>(self: Array<Item>, ...extensions: Array<Item>[]): Array<Item> {
  return extensions.length > 0 && !extensions.every(isEmpty) ? self.concat(...extensions) : self;
}
