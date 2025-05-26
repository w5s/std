import type { Awaitable } from '@w5s/async';
import { tryCall } from '@w5s/async/dist/tryCall.js';
import type { Result } from '@w5s/core/dist/Result.js';
import type { Task, TaskCanceler, TaskLike } from '../Task.js';
import { from } from './from.js';
import { run } from './run.js';

/**
 * Task constructor
 *
 * @example
 * ```typescript
 * const getTime = Task(() => Task.ok(Date.now()));
 * const fetchTask = (url: string) => Task(() => fetch(url).then(Task.ok, Task.error));
 * const delay = (ms: number) => Task(() => new Promise(resolve => { setTimeout(() => resolve(Task.ok()); }), ms));
 * ```
 * @category Constructor
 * @param sideEffect - the effect function
 */
export function create<Value, Error = never>(
  sideEffect: (resolver: {
    /**
     * Canceler
     */
    canceler: TaskCanceler;
    /**
     * A task runner that can be used to run subtasks
     */
    run: <V, E>(task: TaskLike<V, E>) => Awaitable<Result<V, E>>;
  }) => Awaitable<Result<Value, Error>>,
): Task<Value, Error> {
  return from(({ resolve, reject, canceler }) => {
    canceler.current = undefined;
    return tryCall(
      () =>
        sideEffect({
          canceler,
          run: (task) => run(task, canceler),
        }),
      (result) => (result.ok ? resolve(result.value) : reject(result.error)),
    );
  });
}
