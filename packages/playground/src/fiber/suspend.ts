import { __toFiberId } from './__toFiberId.js';
import type { FiberIdLike } from './FiberIdLike.js';
import { Scheduler } from './Scheduler.js';

/**
 * Suspend temporarily a fiber execution
 *
 * @example
 * ```typescript
 * const fiber = run(function* () { ... });
 *
 * suspend(fiber);// This will suspend execution
 * setTimeout(() => resume(fiber), 1000);// This will resume execution after 1 second
 * ```
 * @param fiber - The fiber to suspend
 */
export function suspend(fiber: FiberIdLike): void {
  Scheduler.suspend(__toFiberId(fiber));
}
