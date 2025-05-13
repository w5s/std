import { WEEKS } from '../__constants.js';
import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

/**
 * Return a duration of `amount` days
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.weeks(1);// 1000 * 60 * 60 * 24 * 7
 * ```
 * @category Constructor
 * @param amount - Number of weeks
 */
export function weeks(amount: number): TimeDuration {
  return of(amount * WEEKS);
}
