import type { Task, TaskLike } from '@w5s/task';
import type { TimeDuration } from '@w5s/time';
import { TimeoutError } from '@w5s/error/dist/TimeoutError.js';
import { from } from '@w5s/task/dist/Task/from.js';
import { TaskCanceler } from '@w5s/task/dist/TaskCanceler.js';
import { unsafeCall } from '@w5s/task/dist/Task/unsafeCall.js';
import { TimeDurationAsString } from '@w5s/time/dist/TimeDuration/TimeDurationAsString.js';
import type { Option } from '@w5s/core';

const cancel = (canceler: TaskCanceler) => {
  const { current } = canceler;
  if (current != null) {
    canceler.current = undefined;
    current();
  }
};

const timeDurationString = TimeDurationAsString.asString;
/**
 * Creates a task that will reject a {@link TimeoutError} if `task` is not resolved or rejected within `delay`
 * If timeout is omitted, the task is returned unchanged
 *
 * @example
 * ```typescript
 * const longTask = Time.delay(TimeDuration({ hours: 1 }));
 * const timeoutTask = timeout(longTask, TimeDuration(4));
 * Task.run(timeoutTask); // Result.Error(TimeoutError({ message: 'Task timed out after 4ms', delay: 4 }))
 * // Note that `longTask` will be canceled and will never resolve nor reject
 * ```
 * @param self - task to cancel after delay
 * @param delay - delay in milliseconds
 */
export function timeout<Value, Error>(
  self: TaskLike<Value, Error>,
  delay: Option<TimeDuration>,
): Task<Value, TimeoutError | Error> {
  return delay == null
    ? from(self)
    : from(({ resolve, reject, canceler }) => {
        const taskCanceler = TaskCanceler();
        const taskCancel = () => {
          cancel(taskCanceler);
        };

        const timeoutId = setTimeout(() => {
          taskCancel();
          reject(
            new TimeoutError({
              message: `Task timed out after ${timeDurationString(delay)}`,
            }),
          );
        }, delay);
        const timeoutCancel = () => clearTimeout(timeoutId);

        canceler.current = () => {
          taskCancel();
          timeoutCancel();
        };

        return unsafeCall(self, {
          resolve: (value) => {
            timeoutCancel();
            resolve(value);
          },
          reject: (error) => {
            timeoutCancel();
            reject(error);
          },
          canceler: taskCanceler,
        });
      });
}
