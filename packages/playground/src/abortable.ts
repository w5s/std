import type { TaskLike, Task } from '@w5s/task';
import { AbortError } from '@w5s/error/dist/AbortError.js';
import { from } from '@w5s/task/dist/Task/from.js';

export interface AbortOptions {
  signal: AbortSignal;
}

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
