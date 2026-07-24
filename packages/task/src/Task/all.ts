import type { Task, TaskLike } from '../Task.js';

import { emptyArray } from '../internal/emptyArray.js';
import { from } from './from.js';
import { TaskAggregateState } from './TaskAggregateState.js';

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
 * @param tasks tasks to be run in parallel
 */
export function all<T extends ReadonlyArray<TaskLike<any, any>>>(
  tasks: [...T],
): Task<{ [K in keyof T]: Task.ValueOf<T[K]> }, Task.ErrorOf<T[keyof T]>>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error>;
export function all<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<ReadonlyArray<Value>, Error> {
  return from((parameters) => {
    const taskArray = Array.from(tasks, (task, key) => ({ key, task }));
    if (taskArray.length === 0) {
      parameters.resolve(emptyArray);
    } else {
      // eslint-disable-next-line unicorn/no-new-array
      const values = new Array<undefined | Value>(taskArray.length);
      TaskAggregateState(taskArray, parameters, { cancelChildrenFromParent: true }).runAll(
        (value, entry, self) => {
          values[entry.key] = value;
          if (self.isComplete()) {
            self.resolve(values as ReadonlyArray<Value>);
          }
        },
        (error: Error, { key: currentKey }, self) => {
          self.reject(error);
          // cancel all but the current task
          self.cancelIf(({ key }) => key !== currentKey);
        },
      );
    }
  });
}
