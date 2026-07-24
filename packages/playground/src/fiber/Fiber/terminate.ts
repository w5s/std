import type { FiberIdLike } from '../FiberIdLike.js';

import { scheduler } from '../internal/scheduler.js';
import { toFiberId } from '../internal/toFiberId.js';

/**
 * Terminate a fiber
 *
 * @example
 * ```typescript
 * const fiber = Fiber.run(function* () { ... });
 *
 * Fiber.terminate(fiber);// This will stop execution
 * ```
 * @param fiber The fiber to terminate
 */
export function terminate(fiber: FiberIdLike): boolean {
  return scheduler.terminate(toFiberId(fiber));
}
