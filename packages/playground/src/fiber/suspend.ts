import type { FiberId } from './FiberId.js';
import type { FiberResult } from './FiberResult.js';
import { Scheduler } from './Scheduler.js';

export function suspend(fiber: FiberId | FiberResult<unknown>): void {
  const fiberId = typeof fiber === 'number' ? fiber : fiber.id;
  Scheduler.suspend(fiberId);
}
