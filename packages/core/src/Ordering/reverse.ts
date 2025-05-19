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
 * @param ordering - the ordering
 */
export function reverse(ordering: Ordering): Ordering {
  return ordering === 0 ? ordering : (-ordering as Ordering);
}
