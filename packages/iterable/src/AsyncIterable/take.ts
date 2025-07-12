import { filter } from './filter.js';

/**
 * Take a specified number of elements from an iterable.
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.take(iterable, 2); // == AsyncIterable.of(1, 2)
 * ```
 * @param self - the iterator
 * @param limit - the limit of items to take
 */
export function take<Value>(self: AsyncIterable<Value>, limit: number): AsyncIterable<Value> {
  return limit < 0 ? self : filter(self, (_, currentIndex) => currentIndex < limit);
}
