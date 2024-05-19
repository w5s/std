import type { TimeDuration } from './TimeDuration.js';
import { hours } from './hours.js';
import { of } from './of.js';

const DAYS = hours(24);

/**
 * Return a duration of `amount` days
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.days(1);// 1000 * 60 * 60 * 24
 * ```
 * @category Constructor
 * @param amount - Number of days
 */
export function days(amount: number): TimeDuration {
  return of(amount * DAYS);
}
