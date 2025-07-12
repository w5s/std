import { filter } from './filter.js';

/**
 * Take a specified number of elements from an iterable.
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(1, 2, 3);
 * Iterable.take(iterable, 2); // == Iterable.of(1, 2)
 * ```
 * @param self - the iterator
 * @param limit - the limit of items to take
 */
export function take<Value>(self: Iterable<Value>, limit: number): Iterable<Value> {
  return limit < 0 ? self : filter(self, (_, currentIndex) => currentIndex < limit);
}
