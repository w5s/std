import { DAYS } from '../__constants.js';
import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

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
