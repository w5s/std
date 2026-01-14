import type { Result } from '@w5s/core';
import type { Task, TaskLike } from '../Task.js';
import { TaskAggregateState } from './TaskAggregateState.js';
import { from } from './from.js';
import { ok as resultOk } from './ok.js';
import { error as resultError } from './error.js';

/**
 * Resolves with the record of all task values, or reject with the first error
 *
 * @example
 * ```typescript
 * const success = Task.allSettledKeyed({
 *   task1: Task.resolve(1),
 *   task2: Task.reject('error'),
 * });
 * const result = Task.run(success);// Result.Ok({
 *   task1: Result.Ok(1),
 *   task2: Result.Error('error'),
 * })
 *
 * ```
 * @param tasks - tasks to be run in parallel
 */
export function allSettledKeyed<TaskRecord extends Record<string, TaskLike<any, any>>>(
  tasks: TaskRecord,
): Task<{ [K in keyof TaskRecord]: Result<Task.ValueOf<TaskRecord[K]>, Task.ErrorOf<TaskRecord[K]>> }, never> {
  return from((parameters) => {
    const taskArray = Object.entries(tasks).map(([key, task]) => ({ key, task }));
    if (taskArray.length === 0) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      parameters.resolve({} as { [K in keyof TaskRecord]: Task.ValueOf<TaskRecord[K]> });
    } else {
      const state = TaskAggregateState(taskArray, parameters, { cancelChildrenFromParent: true });
      const results: Record<string, any> = {};
      const finish = () => {
        if (state.isComplete()) {
          // @ts-ignore TypeScript cannot infer that all keys are present here
          state.resolve(Object.freeze(results));
        }
      };
      state.runAll(
        (value, entry) => {
          results[entry.key] = resultOk(value);
          finish();
        },
        (error, entry) => {
          results[entry.key] = resultError(error);
          finish();
        },
      );
    }
  });
}
