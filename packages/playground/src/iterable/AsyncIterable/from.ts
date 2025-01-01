import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 *
 * @example
 * ```typescript
 * AsyncIterable.from([1, Promise.resolve(2), 3]);// AsyncIterable.of(1, 2, 3)
 * AsyncIterable.from(Iterable.of(1, Promise.resolve(2), 3));// AsyncIterable.of(1, 2, 3)
 * ```
 * @param source
 */
export function from<Value>(source: AsyncIterableLike<Value>): AsyncIterable<Value> {
  return {
    async *[Symbol.asyncIterator]() {
      yield* source;
    },
  };
}
