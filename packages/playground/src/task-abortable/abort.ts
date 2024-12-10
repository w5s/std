import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

/**
 * Return a task that will run abort on the {@link AbortController}
 *
 * @example
 * ```ts
 * const controller = new AbortController();
 * const abortTask = abort(controller); // Task.unsafeRun(abortTask) will actually run abort
 * ```
 * @param controller
 */
export function abort(controller: AbortController): Task<void, never> {
  return taskFrom(({ resolve }) => resolve(controller.abort()));
}
