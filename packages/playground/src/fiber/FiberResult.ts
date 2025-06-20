import type { FiberId } from './FiberId.js';

export interface FiberResult<Return> {
  readonly id: FiberId;
  readonly promise: Promise<Return>;
}
