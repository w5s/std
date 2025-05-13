import { __truncate } from '../__truncate.js';
import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a time duration to minutes.
 *
 * @example
 * ```typescript
 * TimeDuration.toMinutes(TimeDuration(60000)); // == 1.0
 * TimeDuration.toMinutes(TimeDuration(150000), true); // == 2.5
 * ```
 * @param self - The time duration in milliseconds.
 * @param truncate - Whether to truncate the result to an integer. Defaults to false.
 * @returns The time duration in minutes.
 */
export function toMinutes(self: TimeDuration, truncate = false): number {
  return __truncate(self / 60_000, truncate);
}
