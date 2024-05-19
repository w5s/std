import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

/**
 * Return a duration of `amount` milliseconds
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.milliseconds(1);// 1
 * ```
 * @category Constructor
 * @param amount - Number of milliseconds
 */
export function milliseconds(amount: number): TimeDuration {
  return of(amount);
}
