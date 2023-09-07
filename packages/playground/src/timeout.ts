import { DataError } from '@w5s/core/dist/dataError.js';
import { cancel } from '@w5s/core/dist/cancel.js';
import type { TaskCanceler, Task, TimeDuration } from '@w5s/core';

/**
 * An error reported when a task times out
 */
export interface TimeoutError
  extends DataError<{
    name: 'TimeoutError';
    /**
     * The delay that was used
     */
    delay: TimeDuration;
  }> {}

/**
 * TimeoutError constructor
 *
 * @category Constructor
 */
export const TimeoutError = DataError.Make<TimeoutError>('TimeoutError');

/**
 * Creates a task that will reject a {@link TimeoutError} if `task` is not resolved or rejected within `delay`
 *
 * @example
 * ```typescript
 * const longTask = Task.delay(TimeDuration.hours(1));
 * const timeoutTask = timeout(longTask, TimeDuration.milliseconds(4));
 * unsafeRun(timeoutTask); // Result.Error(TimeoutError({ message: 'Task timed out after 4ms', delay: 4 }))
 * // Note that `longTask` will be canceled and will never resolve nor reject
 * ```
 * @param task - task to cancel after delay
 * @param delay - delay in milliseconds
 */
export function timeout<Value, Error>(
  task: Task<Value, Error>,
  delay: TimeDuration
): Task<Value, TimeoutError | Error> {
  return {
    taskRun: ({ resolve, reject, canceler, run }) => {
      const taskCancelerRef: TaskCanceler = { current: undefined };
      const taskCancel = () => cancel(taskCancelerRef);

      const timeoutId = setTimeout(() => {
        taskCancel();
        reject(
          TimeoutError({
            message: `Task timed out after ${stringifyDelay(delay)}`,
            delay,
          })
        );
      }, delay);
      const timeoutCancel = () => clearTimeout(timeoutId);

      canceler.current = () => {
        taskCancel();
        timeoutCancel();
      };

      task.taskRun({
        resolve: (value) => {
          timeoutCancel();
          resolve(value);
        },
        reject: (error) => {
          timeoutCancel();
          reject(error);
        },
        canceler: taskCancelerRef,
        run,
      });
    },
  };
}

function stringifyDelay(delay: TimeDuration) {
  return `${String(delay)}ms`;
}
