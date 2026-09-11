import type { Pretty } from './Pretty.js';

/**
 * Makes the specified keys of a type writable, handling special cases for Map, Set, and arrays.
 *
 * @example
 * ```ts
 * type Example = WritableKeys<{ readonly a: number; readonly b: string }, 'a'>;
 * // Result: { a: number; readonly b: string }
 * ```
 */
export type WritableKeys<T, Keys extends keyof T> =
  Pretty<
    Omit<T, Keys> &
    { -readonly [TKey in keyof T as TKey extends Keys ? TKey : never]: T[TKey] }
  >;
