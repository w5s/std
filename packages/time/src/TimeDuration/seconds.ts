import { SECONDS } from '../__constants.js';
import type { TimeDuration } from './TimeDuration.js';
import { of } from './of.js';

/**
 * Return a duration of `amount` seconds
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.seconds(1);// 1000
 * ```
 * @category Constructor
 * @param amount - Number of seconds
 */
export function seconds(amount: number): TimeDuration {
  return of(amount * SECONDS);
}
