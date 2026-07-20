import type { FiberId } from '../FiberId.js';
import type { FiberIdLike } from '../FiberIdLike.js';

export function toFiberId(fiber: FiberIdLike): FiberId {
  return typeof fiber === 'number' ? fiber : fiber.id;
}
