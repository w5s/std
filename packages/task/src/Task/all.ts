import type { TaskLike, Task as TTask } from '../Task.js';
import type { Task } from './Task.js';
import { TaskAggregateState } from './TaskAggregateState.js';
import { from } from './from.js';
import { __emptyArray } from './__emptyArray.js';

/**
 * Resolves with the array of all task values, or reject with the first error
 *
 * @example
 * ```typescript
 * const success = Task.all([
 *   Task.resolve(1),
 *   Task.resolve(2),
 * ]);
 * const successResult = Task.run(success);// Result.Ok([1, 2])
 *
 * const failure = Task.all([
 *   Task.resolve(1),
 *   Task.reject('error'),
 * ]);
 * const failureResult = Task.run(failure);// Result.Error('error')
 * ```
 * @param tasks - tasks to be run in parallel
 */
export function all<T extends readonly TaskLike<any, any>[]>(
  tasks: [...T],
): Task<{ [K in keyof T]: TTask.ValueOf<T[K]> }, TTask.ErrorOf<T[keyof T]>>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error> {
  return from((parameters) => {
    const taskArray = Array.from(tasks);
    if (taskArray.length === 0) {
      parameters.resolve(__emptyArray);
    } else {
      const state = TaskAggregateState(taskArray, parameters);

      // Set global canceler
      parameters.canceler.current = state.cancelAll;

      // eslint-disable-next-line unicorn/no-new-array
      const values = new Array<Value | undefined>(taskArray.length);
      state.runAll(
        (value, entry, index) => {
          values[index] = value;
          if (state.isComplete()) {
            state.resolve(values as ReadonlyArray<Value>);
          }
        },
        (error: Error, entry) => {
          if (!state.isComplete()) {
            state.complete();
            state.reject(error);
            // cancel all but the current task
            entry.canceler.current = undefined;
            state.cancelAll();
          }
        },
      );
    }
  });
}
