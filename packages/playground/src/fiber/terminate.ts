import { __toFiberId } from './__toFiberId.js';
import type { FiberIdLike } from './FiberIdLike.js';
import { Scheduler } from './Scheduler.js';

/**
 * Terminate a fiber
 *
 * @example
 * ```typescript
 * const fiber = run(function* () { ... });
 *
 * terminate(fiber);// This will stop execution
 * ```
 * @param fiber - The fiber to terminate
 */
export function terminate(fiber: FiberIdLike): boolean {
  return Scheduler.terminate(__toFiberId(fiber));
}
