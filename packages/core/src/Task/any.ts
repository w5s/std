import type { AggregateError } from '@w5s/error';
import type { Task, TaskLike } from '../Task.js';
import { wrap } from './wrap.js';
import { TaskAggregateState } from './TaskAggregateState.js';

/**
 * Resolves with the first value, or reject with an aggregated error
 *
 * @example
 * ```typescript
 * const success = Task.any([
 *   Task.reject(1),
 *   Task.resolve(2),
 * ]);
 * const successResult = unsafeRun(success);// Result.Ok(2)
 *
 * const failure = Task.any([
 *   Task.reject('error1'),
 *   Task.reject('error2'),
 * ]);
 * const failureResult = unsafeRun(failure);// Result.Error(AggregateError({ errors: ['error1', 'error2']}))
 * ```
 * @param tasks - tasks to be run in parallel
 */
export function any<T extends TaskLike<any, any>[]>(
  tasks: [...T]
): Task<Task.ValueOf<T[keyof T]>, AggregateError<{ [K in keyof T]: Task.ErrorOf<T[K]> }>>;
export function any<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<Value, AggregateError<Error[]>>;
export function any<Value, Error>(tasks: Iterable<TaskLike<Value, Error>>): Task<Value, AggregateError<Error[]>> {
  return wrap((parameters) => {
    const taskArray = Array.from(tasks);

    if (taskArray.length === 0) {
      parameters.reject(globalThis.AggregateError([]) as AggregateError<Error[]>);
    } else {
      const state = new TaskAggregateState(taskArray, parameters);

      // Set global canceler
      parameters.canceler.current = state.cancelAll.bind(state);

      // eslint-disable-next-line unicorn/no-new-array
      const errors = new Array<Error | undefined>(state.taskCount);
      state.runAll(
        (value, entry) => {
          if (!state.isComplete()) {
            state.complete();
            state.resolve(value);
            // cancel all but the current task
            entry.canceler.current = undefined;
            state.cancelAll();
          }
        },
        (error, entry, index) => {
          errors[index] = error;
          if (state.isComplete()) {
            state.reject(globalThis.AggregateError(errors) as AggregateError<Error[]>);
          }
        }
      );
    }
  });
}
