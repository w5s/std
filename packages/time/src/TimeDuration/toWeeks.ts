import { WEEKS } from '../__constants.js';
import { __truncate } from '../__truncate.js';
import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a time duration to weeks.
 *
 * @example
 * ```typescript
 * TimeDuration.toWeeks(TimeDuration.from({ weeks: 1 })); // == 1
 * TimeDuration.toWeeks(TimeDuration.from({ weeks: 1.5 })); // == 1.5
 * TimeDuration.toWeeks(TimeDuration.from({ weeks: 1.5 }), true); // == 1
 * ```
 *
 * @param self - The time duration in milliseconds.
 * @param truncate - Whether to truncate the result to an integer. Defaults to false.
 * @returns The time duration in weeks.
 */
export function toWeeks(self: TimeDuration, truncate = false): number {
  return __truncate(self / WEEKS, truncate);
}
