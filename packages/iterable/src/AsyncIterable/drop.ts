import { filter } from './filter.js';

/**
 * Skips the given number of elements at the start of this iterator.
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.drop(iterable, 1); // == AsyncIterable.of(2, 3)
 * ```
 * @param self - the iterator
 * @param limit - the limit of items to take
 */
export function drop<Value>(self: AsyncIterable<Value>, limit: number): AsyncIterable<Value> {
  return limit <= 0 ? self : filter(self, (_, currentIndex) => currentIndex >= limit);
}
