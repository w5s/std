import type { Awaitable } from './Awaitable.js';
import { isPromiseLike } from './isPromiseLike.js';

/**
 * Returns `block().then(onSuccess, onError)` when a asynchronous.
 * Else returns `try { return onSuccess(block()) } catch (error) { onError(error) }` when synchronous
 *
 * @example
 * ```ts
 * const syncBlock = () => 'sync'
 * tryCall(syncBlock, (_) => `${_}_foo`);// 'async_foo'
 * const asyncBlock = () => Promise.resolve('async')
 * tryCall(asyncBlock, (_) => `${_}_foo`);// Promise.resolve('async_foo')
 * ```
 *
 * @param block - the callback returning an awaitable value
 * @param onSuccess - the value mapper function
 * @param onError - the error mapper function
 */
export function tryCall<T, TResult1 = T, TResult2 = never>(
  block: () => Awaitable<T>,
  onSuccess: ((value: T) => TResult1) | undefined,
  onError?: (error: unknown) => TResult2
): Awaitable<TResult1 | TResult2> {
  try {
    const valueOrPromise = block();
    return isPromiseLike(valueOrPromise)
      ? // eslint-disable-next-line promise/prefer-await-to-then
        valueOrPromise.then(onSuccess, onError)
      : onSuccess == null
        ? (valueOrPromise as Awaitable<TResult1>)
        : onSuccess(valueOrPromise);
  } catch (error) {
    if (onError != null) {
      return onError(error);
    }
    throw error;
  }
}
