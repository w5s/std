import type { Awaitable } from '@w5s/async';
import type { Result } from '@w5s/core';

import { isPromiseLike } from '@w5s/async/dist/isPromiseLike.js';

import type { TaskLike } from '../Task.js';
import type { TaskCanceler } from '../TaskCanceler.js';

import { error } from '../Task/error.js';
import { ok } from '../Task/ok.js';
import { unsafeCall } from '../Task/unsafeCall.js';

/**
 * Run `task` and return the result or a promise of the result
 *
 * **⚠ Impure function that may throw an error, it should be used on the edge of the program.**
 *
 * @internal
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = taskRun(getMessage);// Result.Ok('Hello World!')
 * ```
 * @param self the task to be run
 * @param canceler the canceler to use for the task
 */
export function taskRun<Value, Error>(
  self: TaskLike<Value, Error>,
  canceler: TaskCanceler,
): Awaitable<Result<Value, Error>> {
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};

  const runValue: Awaitable<void> = unsafeCall(self, {
    canceler,
    reject: (_error) => resolveHandler(error(_error)),
    resolve: (_value) => resolveHandler(ok(_value)),
  });
  // Try to catch promise errors
  if (isPromiseLike(runValue)) {
    void (async () => {
      try {
        await runValue;
      } catch (_error) {
        rejectHandler(_error);
      }
    })();
  }
  if (returnValue === undefined) {
    const { promise, reject, resolve } = Promise.withResolvers<Result<Value, Error>>();
    resolveHandler = resolve;
    rejectHandler = reject;
    return promise;
  }

  return returnValue;
}
