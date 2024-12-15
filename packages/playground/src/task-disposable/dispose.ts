import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const disposeSymbol: typeof Symbol.dispose = Symbol.dispose ?? Symbol.for('dispose');
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const asyncDisposeSymbol: typeof Symbol.asyncDispose = Symbol.asyncDispose ?? Symbol.for('asyncDispose');

/**
 * Dispose the given Disposable or AsyncDisposable
 *
 * @example
 * ```ts
 * const resource: Disposable;
 * dispose(resource);// Task that will dispose
 * ```
 * @param resource - The Disposable or AsyncDisposable to dispose
 */
export function dispose(resource: Disposable | AsyncDisposable): Task<void, never> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return taskFrom(({ resolve }) =>
    // eslint-disable-next-line promise/prefer-await-to-then
    asyncDisposeSymbol in resource ? resource[asyncDisposeSymbol]().then(resolve) : resolve(resource[disposeSymbol]()),
  );
}
