import type { Task, TaskLike } from '@w5s/task';
import { all as taskAll } from '@w5s/task/dist/Task/all.js';
import { andRun as taskAndRun } from '@w5s/task/dist/Task/andRun.js';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { map as taskMap } from '@w5s/task/dist/Task/map.js';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const disposeSymbol: typeof Symbol.dispose = Symbol.dispose ?? Symbol.for('dispose');
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const asyncDisposeSymbol: typeof Symbol.asyncDispose = Symbol.asyncDispose ?? Symbol.for('asyncDispose');

export function dispose(resource: Disposable | AsyncDisposable): Task<void, never> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return taskFrom(({ resolve }) =>
    // eslint-disable-next-line promise/prefer-await-to-then
    asyncDisposeSymbol in resource ? resource[asyncDisposeSymbol]().then(resolve) : resolve(resource[disposeSymbol]()),
  );
}

function disposeAll(resources: { disposables: ReadonlyArray<Disposable | AsyncDisposable> }) {
  return taskAll(resources.disposables.map(dispose));
}

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
