// packages/time/src/TimeDuration/toDays.ts
import { DAYS } from '../__constants.js';
import { __truncate } from '../__truncate.js';
import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a time duration to days.
 *
 * @example
 * ```typescript
 * TimeDuration.toDays(TimeDuration.from({ days: 1 })); // == 1
 * TimeDuration.toDays(TimeDuration.from({ days: 1.5 })); // == 1.5
 * TimeDuration.toDays(TimeDuration.from({ days: 1.5 }), true); // == 1
 * ```
 * @param self - The time duration in milliseconds.
 * @param truncate - Whether to truncate the result to an integer. Defaults to false.
 * @returns The time duration in days.
 */
export function toDays(self: TimeDuration, truncate = false): number {
  return __truncate(self / DAYS, truncate);
}
