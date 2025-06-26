import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

/**
 * Dispose the given Disposable or AsyncDisposable
 *
 * @example
 * ```typescript
 * const resource: Disposable;
 * dispose(resource);// Task that will dispose
 * ```
 * @param resource - The Disposable or AsyncDisposable to dispose
 */
export function dispose(resource: Disposable | AsyncDisposable): Task<void, never> {
  return taskFrom(({ resolve }) =>
    Symbol.asyncDispose in resource
      ? // eslint-disable-next-line promise/prefer-await-to-then
        resource[Symbol.asyncDispose]().then(resolve)
      : resolve(resource[Symbol.dispose]()),
  );
}
