import { isPromise } from '@w5s/async/dist/isPromise.js';
import type { Result } from '../Result.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

type NonPromise<V> = Exclude<V, Promise<unknown>>;

/**
 * Returns `Ok(block())`. If an error was thrown then it returns `Error(onError(<<thrown error>>))` instead
 *
 * @example
 * ```typescript
 * const class InvalidURLError extends Error {}
 * const result = Result.tryCall(
 *  () => new URL('my/url'),
 *  (error) => new InvalidURLError()
 * );
 *
 * const class FetchError extends Error {}
 * const result = Result.tryCall(
 *  () => fetch('my/url'),
 *  () => new FetchError()
 * );
 * ```
 * @param block - A function that will be called
 * @param onError - An error handler that transforms `unknown` to a normalized and typed error
 */
export function tryCall<V, E>(block: () => Promise<V>, onError: (error: unknown) => Promise<E>): Promise<Result<V, E>>;
export function tryCall<V, E>(block: () => NonPromise<V>, onError: (error: unknown) => NonPromise<E>): Result<V, E>;
export function tryCall<V, E>(block: () => V | Promise<V>, onError: (error: unknown) => E | Promise<E>) {
  try {
    const returnValue = block();
    if (isPromise(returnValue)) {
      // eslint-disable-next-line promise/prefer-await-to-then
      return returnValue.then(Ok, async (rejectError) => Error(await onError(rejectError)));
    }

    return Ok(returnValue);
  } catch (thrownError: unknown) {
    const resultError = onError(thrownError);

    // eslint-disable-next-line promise/prefer-await-to-then
    return isPromise(resultError) ? resultError.then(Error) : Error(resultError);
  }
}
