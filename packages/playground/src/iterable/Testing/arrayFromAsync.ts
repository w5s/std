import type { AsyncIterableLike } from '../AsyncIterableLike.js';

export const arrayFromAsync: <T>(iterable: AsyncIterableLike<T>) => Promise<Array<T>> =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Array.fromAsync ??
  (async <T>(iterable: AsyncIterable<T>) => {
    const returnValue: Array<T> = [];
    for await (const item of iterable) {
      returnValue.push(item);
    }
    return returnValue;
  });
