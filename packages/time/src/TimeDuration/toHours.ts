import { __truncate } from '../__truncate.js';
import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a time duration to hours.
 *
 * @example
 * ```typescript
 * TimeDuration.toHours(TimeDuration(3600000));// == 1
 * TimeDuration.toHours(TimeDuration(3600000 * 1.5));// == 1.5
 * TimeDuration.toHours(TimeDuration(3600000 * 1.5, true));// == 1
 * ```
 * @param self - The time duration in milliseconds.
 * @returns The time duration in hours.
 */
export function toHours(self: TimeDuration, truncate = false): number {
  return __truncate(self / 3_600_000, truncate);
}
