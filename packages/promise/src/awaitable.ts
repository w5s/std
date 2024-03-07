import { isPromiseLike } from './isPromiseLike.js';

/**
 * Type for something that can be used with `await`.
 * It can be either `T` or `Promise<T>`
 *
 * @see https://stackoverflow.com/a/56129545
 */
export type Awaitable<T> = T | PromiseLike<T>;

/**
 * @namespace
 */
export const Awaitable = {
  /**
   * Returns `self.then(mapFn)` when a Promise else `mapFn(self)`
   *
   * @example
   * ```ts
   * const promise = Promise.resolve(2);
   * Awaitable.map(promise, (_) => _ * 3); // Promise.resolve(6)
   *
   * const value = 2;
   * Awaitable.map(value, (_) => _ * 3); // 6
   * ```
   *
   * @param self - the awaitable
   * @param mapFn - the mapper function
   */
  map<From, To>(self: Awaitable<From>, mapFn: (value: From) => To): Awaitable<To> {
    // eslint-disable-next-line promise/prefer-await-to-then
    return isPromiseLike(self) ? self.then(mapFn) : mapFn(self);
  },
};
