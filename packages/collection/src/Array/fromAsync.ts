/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Array } from '../Array.js';
import { __fromAsync as __fromAsyncCompat } from './__fromAsync.compat.js';

const __fromAsync: any = globalThis.Array.fromAsync ?? __fromAsyncCompat;

/**
 * Creates an array from an async iterator or iterable object.
 *
 * @param iterableOrArrayLike - An async iterator or array-like object to convert to an array.
 * @example
 * ```typescript
 * await Array.fromAsync(function* () {
 *   let index = 0;
 *   while (index < 5) {
 *     yield Promise.resolve(index);*
 *     index += 1;
 *   }
 * });// [0, 1, 2, 3, 4]
 * ```
 */
export function fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>>): Promise<Array<T>>;
/**
 * Creates an array from an async iterator or iterable object.
 *
 * @example
 * ```typescript
 * Array.fromAsync(function* () {
 *   let index = 0;
 *   while (index < 5) {
 *     yield Promise.resolve(index);*
 *     index += 1;
 *   }
 * }, (value) => value * 2);// [0, 2, 4, 6, 8]
 * ```
 * @param iterableOrArrayLike - An async iterator or array-like object to convert to an array.
 * @param mapFn - A mapping function to call on every element of iterableOrArrayLike.
 *      Each return value is awaited before being added to result array.
 */
export function fromAsync<T, U>(
  iterableOrArrayLike: AsyncIterable<T> | Iterable<T>,
  mapFn: (value: Awaited<T>, index: number) => U,
): Promise<Array<Awaited<U>>>;
export function fromAsync(iterableOrArrayLike: any, mapFn: any = (_: any) => _) {
  return __fromAsync(iterableOrArrayLike, mapFn);
}
