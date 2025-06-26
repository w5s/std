/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Array } from '../Array.js';

const _fromAsync: any =
  // @ts-ignore Polyfill it
  Array.fromAsync ??
  (async (iterable: any, mapFn: any = (_: any) => _) => {
    const returnValue: globalThis.Array<any> = [];
    let index = 0;

    if (Symbol.asyncIterator in iterable) {
      for await (const item of iterable) {
        returnValue.push(await mapFn(item, index++));
      }
    } else {
      for (const item of iterable) {
        // eslint-disable-next-line no-await-in-loop
        returnValue.push(await mapFn(await item, index++));
      }
    }
    return returnValue;
  });

/**
 * Creates an array from an async iterator or iterable object.
 *
 * @param iterableOrArrayLike - An async iterator or array-like object to convert to an array.
 * @example
 */
export function fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>>): Promise<Array<T>>;
/**
 * Creates an array from an async iterator or iterable object.
 *
 * @example
 * @param iterableOrArrayLike - An async iterator or array-like object to convert to an array.
 * @param mapFn - A mapping function to call on every element of iterableOrArrayLike.
 *      Each return value is awaited before being added to result array.
 */
export function fromAsync<T, U>(
  iterableOrArrayLike: AsyncIterable<T> | Iterable<T>,
  mapFn: (value: Awaited<T>, index: number) => U,
): Promise<Array<Awaited<U>>>;
export function fromAsync(iterableOrArrayLike: any, mapFn: any = (_: any) => _) {
  return _fromAsync(iterableOrArrayLike, mapFn);
}
