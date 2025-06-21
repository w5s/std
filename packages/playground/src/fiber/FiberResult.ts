import type { FiberId } from './FiberId.js';

export interface FiberResult<Return> {
  /**
   * The id of the fiber.
   */
  readonly id: FiberId;
  /**
   * A Promise that resolves to the return value of the fiber.
   */
  readonly promise: Promise<Return>;
}
