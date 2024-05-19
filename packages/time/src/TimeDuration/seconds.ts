import type { TimeDuration } from './TimeDuration.js';
import { milliseconds } from './milliseconds.js';
import { of } from './of.js';

const SECONDS = milliseconds(1000);

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
