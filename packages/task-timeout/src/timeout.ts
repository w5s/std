import type { TaskCanceler, Task, TaskLike } from '@w5s/task';
import type { TimeDuration } from '@w5s/time';
import { TimeoutError } from '@w5s/error/dist/TimeoutError.js';
import { from } from '@w5s/task/dist/Task/from.js';
import type { Option } from '@w5s/core';

/**
 * Creates a task that will reject a {@link TimeoutError} if `task` is not resolved or rejected within `delay`
 * If timeout is omitted, the task is returned unchanged
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
  task: TaskLike<Value, Error>,
  delay: Option<TimeDuration>
): Task<Value, TimeoutError | Error> {
  return delay == null
    ? from(task)
    : from(({ resolve, reject, canceler, run }) => {
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
