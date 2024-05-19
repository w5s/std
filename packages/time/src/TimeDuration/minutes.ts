import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';
import { seconds } from './seconds.js';

const MINUTES = seconds(60);

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
