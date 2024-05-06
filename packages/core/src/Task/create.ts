import { type Awaitable } from '@w5s/async';
import { tryCall } from '@w5s/async/dist/tryCall.js';
import type { Result } from '../Result.js';
import type { Task, TaskCanceler, TaskLike } from '../Task.js';
import { wrap } from './wrap.js';
import { Ok } from '../Result/Ok.js';
import { Error } from '../Result/Error.js';

/**
 * Task constructor
 *
 * @example
 * ```typescript
 * const getTime = Task(({ ok }) => ok(Date.now()));
 * const fetchTask = (url: string) => Task(({ ok, error }) => fetch(url).then(ok, error));
 * const delay = (ms: number) => Task(({ ok }) => new Promise(resolve => { setTimeout(() => resolve(ok()); }), ms));
 * ```
 * @category Constructor
 * @param sideEffect - the effect function
 */
export function create<Value, Error = never>(
  sideEffect: (resolver: {
    /**
     * Return a new ok object
     */
    ok: {
      (): Result<void, never>;
      <VV>(value: VV): Result<VV, never>;
    };
    /**
     * Return a new error object
     */
    error: {
      (): Result<never, void>;
      <EE>(errorValue: EE): Result<never, EE>;
    };
    /**
     * Canceler
     */
    canceler: TaskCanceler;
    /**
     * A task runner that can be used to run subtasks
     */
    run: <V, E>(task: TaskLike<V, E>) => Awaitable<Result<V, E>>;
  }) => Awaitable<Result<Value, Error>>
): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return wrap(({ resolve, reject, canceler, run }) => {
    canceler.current = undefined;
    return tryCall(
      () =>
        sideEffect({
          ok: Ok,
          error: Error,
          canceler,
          run: (task) => run(task, canceler),
        }),
      (result) => (result.ok ? resolve(result.value) : reject(result.error))
    );
  });
}
