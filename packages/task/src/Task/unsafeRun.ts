import type { Awaitable } from '@w5s/async';
import { isPromiseLike } from '@w5s/async/dist/isPromiseLike.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import type { Result } from '@w5s/core';
import type { TaskCanceler, TaskLike } from '../Task.js';

/**
 * Run `task` and return the result or a promise of the result
 *
 * **⚠ Impure function that may throw an error, its use is generally discouraged.**
 *
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = Task.unsafeRun(getMessage);// Result.Ok('Hello World!')
 * ```
 * @param task - the task to be run
 */
export function unsafeRun<Value, Error>(
  task: TaskLike<Value, Error>,
  canceler: TaskCanceler = { current: undefined },
): Awaitable<Result<Value, Error>> {
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};
  const runValue: Awaitable<void> = task.taskRun({
    resolve: (value) => resolveHandler(Ok(value)),
    reject: (error) => resolveHandler(Error(error)),
    canceler,
    run: unsafeRun,
  });
  // Try to catch promise errors
  if (isPromiseLike(runValue)) {
    // eslint-disable-next-line promise/prefer-await-to-then, promise/catch-or-return
    runValue.then(undefined, (error) => rejectHandler(error));
  }
  if (returnValue === undefined) {
    // eslint-disable-next-line promise/param-names
    return new Promise<Result<Value, Error>>((resolvePromise, rejectPromise) => {
      resolveHandler = resolvePromise;
      rejectHandler = rejectPromise;
    });
  }

  return returnValue;
}
