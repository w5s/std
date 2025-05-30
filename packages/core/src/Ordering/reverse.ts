import type { Ordering } from '../Ordering.js';

/**
 * Reverses the `Ordering`.
 * - `Less` becomes `Greater`.
 * - `Greater` becomes `Less`.
 * - `Equal` becomes `Equal`.
 *
 * @example
 * ```typescript
 * reverse(Ordering.Less); // == Ordering.Greater
 * reverse(Ordering.Greater); // == Ordering.Less
 * reverse(Ordering.Equal); // == Ordering.Equal
 *
 * ```
 * @param self - the ordering
 */
export function reverse(self: Ordering): Ordering {
  return self === 0 ? self : (-self as Ordering);
}
