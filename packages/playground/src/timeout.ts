import { DataError, Ref, Task, TimeDuration } from '@w5s/core';

export interface TimeoutError extends DataError<{ name: 'TimeoutError' }> {}
export const TimeoutError = DataError.Make<TimeoutError>('TimeoutError');

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
      reject(TimeoutError({}));
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
