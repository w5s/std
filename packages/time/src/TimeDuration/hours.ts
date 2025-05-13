import { HOURS } from '../__constants.js';
import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

/**
 * Return a duration of `amount` hours
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.hours(1);// 1000 * 60 * 60
 * ```
 * @category Constructor
 * @param amount - Number of hours
 */
export function hours(amount: number): TimeDuration {
  return of(amount * HOURS);
}
