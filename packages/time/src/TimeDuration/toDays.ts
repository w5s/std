// packages/time/src/TimeDuration/toDays.ts
import { DAYS } from '../internal/constants.js';
import { truncateIf } from '../internal/truncateIf.js';
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
 * @param self The time duration in milliseconds.
 * @param truncate Whether to truncate the result to an integer. Defaults to false.
 * @returns The time duration in days.
 */
export function toDays(self: TimeDuration, truncate = false): number {
  return truncateIf(self / DAYS, truncate);
}
