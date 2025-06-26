import type { Array } from '../Array.js';

const emptyArray = Object.freeze([]);

/**
 * Always returns an empty array
 *
 * @example
 * ```typescript
 * Array.empty() // []
 * ```
 * @category Constructor
 */
export function empty<Item = never>(): Array<Item> {
  return emptyArray;
}
