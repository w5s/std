/* eslint-disable import/extensions */
import { DataError } from '@w5s/core/lib/dataError.js';
import type { Task } from '@w5s/core/lib/task.js';
import type { TimeDuration } from '@w5s/core/lib/time.js';

const defaultCanceler = () => {};

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
 * ```ts
 * const longTask = Task.delay(TimeDuration.hours(1));
 * const timeoutTask = timeout(longTask, TimeDuration.milliseconds(4));
 * Task.unsafeRun(timeoutTask); // Result.Error(TimeoutError({ message: 'Task timed out after 4ms', delay: 4 }))
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
    'Task/run': (resolve, reject, cancelerRef) => {
      const taskCancelerRef = { current: defaultCanceler };
      const taskCancel = () => {
        taskCancelerRef.current();
        taskCancelerRef.current = defaultCanceler;
      };

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

      cancelerRef.current = () => {
        taskCancel();
        timeoutCancel();
      };

      task['Task/run'](
        (value) => {
          timeoutCancel();
          resolve(value);
        },
        (error) => {
          timeoutCancel();
          reject(error);
        },
        taskCancelerRef
      );
    },
  };
}

function stringifyDelay(delay: TimeDuration) {
  return `${String(delay)}ms`;
}
