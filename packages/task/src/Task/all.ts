import type { Task, TaskLike } from '../Task.js';
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
): Task<{ [K in keyof T]: Task.ValueOf<T[K]> }, Task.ErrorOf<T[keyof T]>>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error> {
  return from((parameters) => {
    const taskArray = Array.from(tasks, (task, key) => ({ task, key }));
    if (taskArray.length === 0) {
      parameters.resolve(__emptyArray);
    } else {
      const state = TaskAggregateState(taskArray, parameters, { cancelChildrenFromParent: true });

      // eslint-disable-next-line unicorn/no-new-array
      const values = new Array<Value | undefined>(taskArray.length);
      state.runAll(
        (value, entry) => {
          values[entry.key] = value;
          if (state.isComplete()) {
            state.resolve(values as ReadonlyArray<Value>);
          }
        },
        (error: Error, { key: currentKey }) => {
          state.reject(error);
          // cancel all but the current task
          state.cancelIf(({ key }) => key !== currentKey);
        },
      );
    }
  });
}
