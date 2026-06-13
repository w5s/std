import type { Task } from '@w5s/task/Task';
import { from as taskFrom } from '@w5s/task/Task/from';

/**
 * Dispose the given Disposable or AsyncDisposable
 *
 * @example
 * ```typescript
 * const resource: Disposable;
 * dispose(resource);// Task that will dispose
 * ```
 * @param resource The Disposable or AsyncDisposable to dispose
 */
export function dispose(resource: Disposable | AsyncDisposable): Task<void, never> {
  return taskFrom(({ resolve }) =>
    Symbol.asyncDispose in resource
      ? resource[Symbol.asyncDispose]().then(resolve)
      : resolve(resource[Symbol.dispose]()),
  );
}
