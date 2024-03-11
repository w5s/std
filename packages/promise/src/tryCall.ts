import type { Awaitable } from './awaitable.js';
import { isPromiseLike } from './isPromiseLike.js';

/**
 * Returns `self.then(onSuccess, onError)` when a Promise else `onSuccess(self)` or `onError(error)` when error is thrown
 *
 * @example
 * ```ts
 * ```
 *
 * @param block - the callback returning an awaitable value
 * @param onSuccess - the value mapper function
 * @param onError - the error mapper function
 */
export function tryCall<T, TResult1 = T, TResult2 = never>(
  block: () => Awaitable<T>,
  onSuccess: ((value: T) => TResult1) | undefined,
  onError?: ((error: unknown) => TResult2) | undefined
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
