import type { WritableKeys } from './WritableKeys.js';

/**
 * Makes a type writable, handling special cases for Map, Set, and arrays.
 *
 * @example
 * ```ts
 * type SomeObject = Writable<{ readonly a: number; readonly b: string }>;
 * // Result: { a: number; b: string }
 *
 * type SomeArray = Writable<readonly number[]>;
 * // Result: Array<number>
 *
 * type SomeMap = Writable<ReadonlyMap<string, number>>;
 * // Result: Map<string, number>
 *
 * ```
 */
export type Writable<T> =
// Handle Map
  T extends ReadonlyMap<infer TKey, infer TValue>
    ? Map<TKey, TValue>
    // Handle Set
    : T extends ReadonlySet<infer ItemType>
      ? Set<ItemType>
      // : T extends ReadonlyArray<unknown>
      // Handle array
      : T extends readonly [] ? []
        : T extends readonly [...infer U, infer V] ? [...U, V]
          : T extends readonly [infer U, ...infer V] ? [U, ...V]
            : T extends ReadonlyArray<infer U> ? Array<U>
              : WritableKeys<T, keyof T>;
