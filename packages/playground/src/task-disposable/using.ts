import type { Task, TaskLike } from '@w5s/task';
import { all as taskAll } from '@w5s/task/dist/Task/all.js';
import { andRun as taskAndRun } from '@w5s/task/dist/Task/andRun.js';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { map as taskMap } from '@w5s/task/dist/Task/map.js';
import { dispose } from './dispose.js';

function disposeAll(resources: { disposables: ReadonlyArray<Disposable | AsyncDisposable> }) {
  return taskAll(resources.disposables.map(dispose));
}

/**
 * Returns a task
 *
 * @example
 * ```ts
 * const getResource1 = (): Task<Disposable, never> => { ... }
 * const getResource2 = (): Task<AsyncDisposable, never> => { ... }
 * const task = using([getResource1(), getResource2()], ([resource1, resource2]) => {
 *   // return a Task that will be forwarded to task
 * }); // resource1 and resource2 will be disposed after this task
 * ```
 * @param tasks
 * @param thenFn
 */
export function using<T extends readonly TaskLike<Disposable | AsyncDisposable, any>[], ToValue, ToError>(
  tasks: [...T],
  thenFn: (disposables: { [K in keyof T]: Task.ValueOf<T[K]> }) => TaskLike<ToValue, ToError>,
): Task<ToValue, Task.ErrorOf<T[keyof T]> | ToError>;
export function using<Value extends Disposable | AsyncDisposable, Error, ToValue, ToError>(
  tasks: Iterable<TaskLike<Value, Error>>,
  thenFn: (disposables: ReadonlyArray<Value>) => TaskLike<ToValue, ToError>,
): Task<ReadonlyArray<Value>, Error | ToError>;
export function using<Value extends Disposable | AsyncDisposable, Error, ToValue, ToError>(
  tasks: Iterable<TaskLike<Value, Error>>,
  thenFn: (disposables: any) => TaskLike<ToValue, ToError>,
): Task<ToValue, Error | ToError> {
  const state = taskThen(taskAll(tasks), (disposables) =>
    taskMap(thenFn(disposables), (returnValue) => ({
      disposables,
      returnValue,
    })),
  );
  const disposed = taskAndRun(state, disposeAll);
  return taskMap(disposed, ({ returnValue }) => returnValue);
}
