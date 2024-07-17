import { empty } from '@w5s/core/dist/Array/empty.js';
import type { Result } from '@w5s/core/dist/Result.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import type { Task, TaskLike } from '../Task.js';
import { TaskAggregateState } from './TaskAggregateState.js';
import { from } from './from.js';

/**
 * Resolves an array of all task results
 *
 * @example
 * ```typescript
 * const task = Task.allSettled([
 *   Task.reject(1),
 *   Task.resolve(2),
 * ]);
 * const taskResults = Task.unsafeRun(task);// [Result.Error(1), Result.Ok(2)]
 * ```
 * @param tasks - tasks to be run in parallel
 */
export function allSettled<T extends TaskLike<any, any>[]>(
  tasks: [...T]
): Task<{ [K in keyof T]: Result<Task.ValueOf<T[K]>, Task.ErrorOf<T[K]>> }, never>;
export function allSettled<Value, Error>(
  tasks: Iterable<TaskLike<Value, Error>>
): Task<ReadonlyArray<Result<Value, Error>>, never>;
export function allSettled<Value, Error>(
  tasks: Iterable<TaskLike<Value, Error>>
): Task<ReadonlyArray<Result<Value, Error>>, never> {
  return from((parameters) => {
    const taskArray = Array.from(tasks);

    if (taskArray.length === 0) {
      parameters.resolve(empty());
    } else {
      const state = new TaskAggregateState(taskArray, parameters);

      // eslint-disable-next-line unicorn/no-new-array
      const results = new Array<Result<Value, Error>>(state.taskCount);
      const finish = () => {
        if (state.isComplete()) {
          state.resolve(Object.freeze(results));
        }
      };
      state.runAll(
        (value, entry, index) => {
          results[index] = Ok(value);
          finish();
        },
        (error, entry, index) => {
          results[index] = Error(error);
          finish();
        }
      );
    }
  });
}
