import type { Awaitable } from '@w5s/async';
import { tryCall as asyncTryCall } from '@w5s/async/dist/tryCall.js';
import { isPromiseLike } from '@w5s/async/dist/isPromiseLike.js';
import { from } from './from.js';
import type { Task } from '../Task.js';

/**
 * Creates a new `Task` that resolves `sideEffect()`.
 * When an exception is thrown then it rejects `onError([thrown error])`.
 *
 * @example
 * ```typescript
 * const class FetchError extends Error {}
 * const task = Task.tryCall(
 *  () => fetch('my/url'),
 *  (error) => new FetchError()
 * );
 * ```
 * @param sideEffect - A function that will be called
 * @param onError - An error handler that transforms `unknown` to a normalized and typed error
 */
export function tryCall<Value, Error>(
  sideEffect: () => Awaitable<Value>,
  onError: (error: unknown) => Awaitable<Error>,
): Task<Value, Error> {
  return from(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ({ resolve, reject }) =>
      asyncTryCall(sideEffect, resolve, (error) => {
        const awaitableError = onError(error);
        // eslint-disable-next-line promise/prefer-await-to-then, promise/no-promise-in-callback
        return isPromiseLike(awaitableError) ? awaitableError.then(reject) : reject(awaitableError);
      }),
  );
}
