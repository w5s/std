import type { Awaitable } from '@w5s/async';
import { create } from './create.js';
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
  onError: (error: unknown) => Awaitable<Error>
): Task<Value, Error> {
  return create(async ({ ok, error }) => {
    try {
      return ok(await sideEffect());
    } catch (error_: unknown) {
      return error(await onError(error_));
    }
  });
}
