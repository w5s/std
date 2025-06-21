import type { FiberId } from './FiberId.js';

/**
 * A type representing either a FiberId or an object with an 'id' property of type FiberId.
 */
export type FiberIdLike = FiberId | { id: FiberId };
