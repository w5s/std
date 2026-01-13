import type { Awaitable } from '@w5s/async';
import { isPromiseLike } from '@w5s/async/dist/isPromiseLike.js';
import type { Result } from '@w5s/core';
import { Ref } from '@w5s/core/dist/Ref.js';
import { error } from './error.js';
import { ok } from './ok.js';
import type { TaskCanceler, TaskLike, TaskParameters, TaskParametersOverrides } from '../Task.js';
import { execute } from './execute.js';

const createParameters = <V, E>(overrides: TaskParametersOverrides<V, E>): TaskParameters<V, E> => {
  const self: TaskParameters<V, E> = {
    resolve: overrides.resolve,
    reject: overrides.reject,
    canceler: overrides.canceler ?? Ref(undefined),
    execute: (subtask, subOverrides) =>
      execute(
        subtask,
        createParameters({
          resolve: subOverrides.resolve,
          reject: subOverrides.reject,
          canceler: subOverrides.canceler ?? self.canceler,
        }),
      ),
  };
  return self;
};

/**
 * Run `task` and return the result or a promise of the result
 *
 * **⚠ Impure function that may throw an error, it should be used on the edge of the program.**
 *
 * @internal
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = __run(getMessage);// Result.Ok('Hello World!')
 * ```
 * @param self - the task to be run
 * @param canceler - the canceler to use for the task
 */
export function __run<Value, Error>(
  self: TaskLike<Value, Error>,
  canceler: TaskCanceler = { current: undefined },
): Awaitable<Result<Value, Error>> {
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};

  const runValue: Awaitable<void> = execute(
    self,
    createParameters({
      resolve: (_value) => resolveHandler(ok(_value)),
      reject: (_error) => resolveHandler(error(_error)),
      canceler,
    }),
  );
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
