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
 * const someTask: Task<Value, Error> = //...;
 * const someTaskAbortable = abortable(someTask, controller); // Task<Value, Error | AbortError>
 * const abortSomeTask = abort(controller); // Task<void, never> that will abort someTask
 * const promise = Task.run(someTaskAbortable); // Starts execution
 *
 * Task.run(abortSomeTask); // This will reject promise with AbortError()
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
    options.signal.addEventListener('abort', () => {
      canceler.current?.();
      reject(AbortError());
    });
    task.taskRun(parameters);
  });
}
