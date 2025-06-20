import type { FiberId } from './FiberId.js';
import type { FiberResult } from './FiberResult.js';
import { Scheduler } from './Scheduler.js';

export function resume(fiber: FiberId | FiberResult<unknown>): void {
  const fiberId = typeof fiber === 'number' ? fiber : fiber.id;
  Scheduler.resume(fiberId);
}
