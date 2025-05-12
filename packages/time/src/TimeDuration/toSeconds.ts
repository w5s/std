import { __truncate } from '../__truncate.js';
import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a time duration to seconds.
 *
 * @example
 * ```typescript
 * TimeDuration.toSeconds(TimeDuration(1500));// == 1.5
 * TimeDuration.toSeconds(TimeDuration(1500), true);// == 1
 * ```
 * @param self - The time duration in milliseconds.
 * @param truncate - Whether to truncate the result to an integer. Defaults to false.
 * @returns The time duration in seconds.
 */
export function toSeconds(self: TimeDuration, truncate = false): number {
  return __truncate(self / 1000, truncate);
}
