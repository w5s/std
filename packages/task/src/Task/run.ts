import type { Awaitable } from '@w5s/async';
import type { Result } from '@w5s/core';
import { Ref } from '@w5s/core/dist/Ref.js';
import type { TaskCanceler, TaskLike, TaskRunOptions } from '../Task.js';
import { __run } from './__run.js';

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
 * @param self - the task to be run
 * @param options - the options for running the task
 */
export function run<Value, Error>(
  self: TaskLike<Value, Error>,
  options: TaskRunOptions = {},
): Awaitable<Result<Value, Error>> {
  const { signal } = options;
  const canceler: TaskCanceler = Ref(undefined);
  if (signal != null) {
    signal.addEventListener('abort', () => {
      canceler.current?.();
    });
  }

  return __run(self, canceler);
}
