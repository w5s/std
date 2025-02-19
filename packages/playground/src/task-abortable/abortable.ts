import type { TaskLike, Task } from '@w5s/task';
import { AbortError } from '@w5s/error/dist/AbortError.js';
import { from } from '@w5s/task/dist/Task/from.js';

export interface AbortOptions {
  /**
   * Abort signal
   */
  signal: AbortSignal;
}

/**
 * Return a new task that can be aborted
 *
 * @example
 * ```typescript
 * const controller = new AbortController();
 * const someTaskAbortable = abortable(... as Task<Value, Error>, controller); // Task<Value, Error | AbortError>
 * const promise = Task.run(someTaskAbortable); // Starts execution
 *
 * Task.run(abort(controller)); // This will reject promise with AbortError()
 * ```
 * @param task
 * @param options
 */
export function abortable<Value, Error>(
  task: TaskLike<Value, Error>,
  options: AbortOptions,
): Task<Value, Error | AbortError> {
  return from((parameters) => {
    const { reject, canceler } = parameters;
    const { signal } = options;
    const doAbort = () => {
      canceler.current?.();
      reject(AbortError());
    };
    if (signal.aborted) {
      doAbort();
    } else {
      signal.addEventListener('abort', doAbort);
      task.taskRun(parameters);
    }
  });
}
