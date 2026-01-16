import type { Task, TaskLike } from '../Task.js';
import { TaskAggregateState } from './TaskAggregateState.js';
import { from } from './from.js';

/**
 * Resolves with the record of all task values, or reject with the first error
 *
 * @example
 * ```typescript
 * const success = Task.allKeyed({
 *   task1: Task.resolve(1),
 *   task2: Task.resolve(2),
 * });
 * const successResult = Task.run(success);// Result.Ok({ task1: 1, task2: 2 })
 *
 * const failure = Task.allKeyed({
 *   task1: Task.resolve(1),
 *   task2: Task.reject('error'),
 * });
 * const failureResult = Task.run(failure);// Result.Error('error')
 * ```
 * @param tasks - tasks to be run in parallel
 */
export function allKeyed<TaskRecord extends Record<string, TaskLike<any, any>>>(
  tasks: TaskRecord,
): Task<{ [K in keyof TaskRecord]: Task.ValueOf<TaskRecord[K]> }, Task.ErrorOf<TaskRecord[keyof TaskRecord]>> {
  return from((parameters) => {
    const taskArray = Object.entries(tasks).map(([key, task]) => ({ key, task }));
    if (taskArray.length === 0) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      parameters.resolve({} as { [K in keyof TaskRecord]: Task.ValueOf<TaskRecord[K]> });
    } else {
      const values: Record<string, any> = {};
      TaskAggregateState(taskArray, parameters, { cancelChildrenFromParent: true }).runAll(
        (value, entry, self) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          values[entry.key] = value;
          if (self.isComplete()) {
            self.resolve(values as { [K in keyof TaskRecord]: Task.ValueOf<TaskRecord[K]> });
          }
        },
        (error, { key: entryKey }, self) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          self.reject(error);
          self.cancelIf(({ key }) => key !== entryKey);
        },
      );
    }
  });
}
