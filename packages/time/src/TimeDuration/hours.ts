import type { TimeDuration } from './TimeDuration.js';
import { minutes } from './minutes.js';
import { of } from './of.js';

const HOURS = minutes(60);

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
