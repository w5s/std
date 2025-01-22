import type { TimeDuration } from './TimeDuration.js';
import { days } from './days.js';
import { of } from './of.js';

const WEEKS = days(7);

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
