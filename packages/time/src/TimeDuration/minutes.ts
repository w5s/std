import { MINUTES } from '../__constants.js';
import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

/**
 * Return a duration of `amount` minutes
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.minutes(1);// 1000 * 60
 * ```
 * @category Constructor
 * @param amount - Number of minutes
 */
export function minutes(amount: number): TimeDuration {
  return of(amount * MINUTES);
}
