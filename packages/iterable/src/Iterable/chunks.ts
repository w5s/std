import { invariant } from '@w5s/error/dist/invariant.js';

/**
 * Splits an iterable into chunks of a specified size
 *
 * @example
 * ```typescript
 * const chunks = Iterable.chunks([1, 2, 3, 4, 5], 2); // == Iterable.of([1, 2], [3, 4], [5])
 * ```
 * @param self - the iterable to split into chunks
 * @param chunkSize - the size of each chunk
 */
export function chunks<Value>(self: Iterable<Value>, chunkSize: number): Iterable<Array<Value>> {
  invariant(chunkSize > 0 && chunkSize <= Number.MAX_SAFE_INTEGER, 'chunkSize must be a positive integer');
  const chunkSizeSafe = Math.trunc(chunkSize);
  return {
    *[Symbol.iterator]() {
      let buffer: Array<Value> = [];
      for (const currentValue of self) {
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
