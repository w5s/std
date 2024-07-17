import type { Awaitable } from '@w5s/async';
import { tryCall } from '@w5s/async/dist/tryCall.js';
import { getOrThrow } from '@w5s/core/dist/Result/getOrThrow.js';
import type { TaskCanceler, TaskLike } from '../Task.js';
import { unsafeRun } from './unsafeRun.js';

/**
 * Run `task` that never fails and return the value or a promise of the value
 *
 * **⚠ Impure function that may throw an error, its use is generally discouraged.**
 *
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = Task.unsafeRunOk(getMessage);// 'Hello World!'
 * ```
 * @param task - the task to be run
 */
export function unsafeRunOk<Value>(task: TaskLike<Value, unknown>, canceler?: TaskCanceler): Awaitable<Value> {
  return tryCall(() => unsafeRun(task, canceler), getOrThrow);
}
