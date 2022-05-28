import { DataError, Ref, Task, TimeDuration } from '@w5s/core';

export interface TimeoutError extends DataError<{ name: 'TimeoutError'; delay: TimeDuration }> {}
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
  return Task.wrap((resolve, reject, cancelerRef) => {
    const taskCancelerRef = Ref(Task.defaultCanceler);
    const taskCancel = () => {
      taskCancelerRef.current();
      taskCancelerRef.current = Task.defaultCanceler;
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

    Ref.write(cancelerRef, () => {
      taskCancel();
      timeoutCancel();
    });

    task[Task.run](
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
  });
}

function stringifyDelay(delay: TimeDuration) {
  return `${String(delay)}ms`;
}
