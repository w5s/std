import { __toFiberId } from '../__toFiberId.js';
import type { FiberIdLike } from '../FiberIdLike.js';
import { __scheduler } from '../__scheduler.js';

/**
 * Terminate a fiber
 *
 * @example
 * ```typescript
 * const fiber = Fiber.run(function* () { ... });
 *
 * Fiber.terminate(fiber);// This will stop execution
 * ```
 * @param fiber - The fiber to terminate
 */
export function terminate(fiber: FiberIdLike): boolean {
  return __scheduler.terminate(__toFiberId(fiber));
}
