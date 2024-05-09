import type { TaskCanceler, Task } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import { CustomError } from '@w5s/error';
import { from } from '@w5s/core/dist/Task/from.js';

/**
 * An error reported when a task times out
 */
export interface TimeoutError
  extends CustomError<{
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
export const TimeoutError = CustomError.define<TimeoutError>('TimeoutError');

/**
 * Creates a task that will reject a {@link TimeoutError} if `task` is not resolved or rejected within `delay`
 *
 * @example
 * ```typescript
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
  return from(({ resolve, reject, canceler, run }) => {
    const taskCancelerRef: TaskCanceler = { current: undefined };
    const taskCancel = () => {
      const { current } = taskCancelerRef;
      if (current != null) {
        taskCancelerRef.current = undefined;
        current();
      }
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
  });
}

function stringifyDelay(delay: TimeDuration) {
  return `${String(delay)}ms`;
}
