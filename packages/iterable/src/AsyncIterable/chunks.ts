import { invariant } from '@w5s/error/dist/invariant.js';

/**
 * Splits an async iterable into chunks of a specified size
 *
 * @example
 * ```typescript
 * const iterator = AsyncIterable.from([1, 2, 3, 4, 5]);
 * const chunks = AsyncIterable.chunks(iterator, 2); // == AsyncIterable.of([1, 2], [3, 4], [5])
 * ```
 * @param self - the iterable to split into chunks
 * @param chunkSize - the size of each chunk
 */
export function chunks<Value>(self: AsyncIterable<Value>, chunkSize: number): AsyncIterable<Array<Value>> {
  invariant(chunkSize > 0 && chunkSize <= Number.MAX_SAFE_INTEGER, 'chunkSize must be a positive integer');
  const chunkSizeSafe = Math.trunc(chunkSize);
  return {
    async *[Symbol.asyncIterator]() {
      let buffer: Array<Value> = [];
      for await (const currentValue of self) {
        buffer.push(currentValue);
        if (buffer.length === chunkSizeSafe) {
          yield buffer;
          buffer = [];
        }
      }
      if (buffer.length > 0) {
        yield buffer;
      }
    },
  };
}
