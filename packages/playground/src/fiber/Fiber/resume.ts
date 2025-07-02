import { __toFiberId } from '../__toFiberId.js';
import type { FiberIdLike } from '../FiberIdLike.js';
import { __scheduler } from '../__scheduler.js';

/**
 * Resume a previously suspended fiber execution
 *
 * @example
 * ```typescript
 * const fiber = Fiber.run(function* () { ... });
 *
 * Fiber.suspend(fiber);// This will suspend execution
 * setTimeout(() => Fiber.resume(fiber), 1000);// This will resume execution after 1 second
 * ```
 * @param fiber - The fiber to resume
 */
export function resume(fiber: FiberIdLike): void {
  __scheduler.resume(__toFiberId(fiber));
}
