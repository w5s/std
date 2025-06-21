import type { FiberId } from './FiberId.js';
import type { FiberIdLike } from './FiberIdLike.js';

export function __toFiberId(fiber: FiberIdLike): FiberId {
  return typeof fiber === 'number' ? fiber : fiber.id;
}
