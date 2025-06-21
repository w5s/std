import { __toFiberId } from './__toFiberId.js';
import type { FiberIdLike } from './FiberIdLike.js';
import { Scheduler } from './Scheduler.js';

/**
 * Resume a previously suspended fiber execution
 *
 * @example
 * ```typescript
 * const fiber = run(function * () { ... });
 *
 * suspend(fiber);// This will suspend execution
 * setTimeout(() => resume(fiber), 1000);// This will resume execution after 1 second
 * ```
 * @param fiber - The fiber to resume
 */
export function resume(fiber: FiberIdLike): void {
  Scheduler.resume(__toFiberId(fiber));
}
