import type { Awaitable } from '@w5s/async';
import { isPromiseLike } from '@w5s/async/dist/isPromiseLike.js';
import type { Result } from '@w5s/core';
import { error } from './error.js';
import { ok } from './ok.js';
import type { TaskCanceler, TaskLike } from '../Task.js';

/**
 * Run `task` and return the result or a promise of the result
 *
 * **⚠ Impure function that may throw an error, it should be used on the edge of the program.**
 *
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = Task.run(getMessage);// Result.Ok('Hello World!')
 * ```
 * @param task - the task to be run
 */
export function run<Value, Error>(
  task: TaskLike<Value, Error>,
  canceler: TaskCanceler = { current: undefined },
): Awaitable<Result<Value, Error>> {
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};
  const runValue: Awaitable<void> = task.taskRun({
    resolve: (value) => resolveHandler(ok(value)),
    reject: (_error) => resolveHandler(error(_error)),
    canceler,
    run,
  });
  // Try to catch promise errors
  if (isPromiseLike(runValue)) {
    // eslint-disable-next-line promise/prefer-await-to-then, promise/catch-or-return
    runValue.then(undefined, (_error) => rejectHandler(_error));
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
