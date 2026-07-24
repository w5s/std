import type { FiberIdLike } from '../FiberIdLike.js';

import { scheduler } from '../internal/scheduler.js';
import { toFiberId } from '../internal/toFiberId.js';

/**
 * Suspend temporarily a fiber execution
 *
 * @example
 * ```typescript
 * const fiber = Fiber.run(function* () { ... });
 *
 * Fiber.suspend(fiber);// This will suspend execution
 * setTimeout(() => Fiber.resume(fiber), 1000);// This will resume execution after 1 second
 * ```
 * @param fiber The fiber to suspend
 */
export function suspend(fiber: FiberIdLike): void {
  scheduler.suspend(toFiberId(fiber));
}
