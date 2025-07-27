import { of } from './of.js';
import type { TimeDuration } from './TimeDuration.js';
import { DAYS, HOURS, MINUTES, SECONDS, WEEKS } from '../__constants.js';

export interface TimeDurationParameters {
  /**
   * Number of weeks
   */
  weeks?: number;
  /**
   * Number of days
   */
  days?: number;
  /**
   * Number of hours
   */
  hours?: number;
  /**
   * Number of minutes
   */
  minutes?: number;
  /**
   * Number of seconds
   */
  seconds?: number;
  /**
   * Number of milliseconds
   */
  milliseconds?: number;
}

/**
 * Converts a number or a TimeDurationObject to a TimeDuration
 *
 * @example
 * ```typescript
 * const duration = TimeDuration.from(1000);// 1000
 * const duration = TimeDuration.from({ milliseconds: 3, seconds: 2, hours: 1 });// 3 + 1000 * 2 + 1000 * 60 * 60 * 1
 * ```
 *
 * @category Constructor
 * @param source - a number of milliseconds or an object with properties:
 *   - `weeks`
 *   - `days`
 *   - `hours`
 *   - `minutes`
 *   - `seconds`
 *   - `milliseconds`
 * @returns a new TimeDuration
 */
export function from(source: number | TimeDurationParameters): TimeDuration {
  if (typeof source === 'number') return of(source);
  const { weeks, days, hours, minutes, seconds, milliseconds } = source;
  let returnValue = 0;
  if (weeks != null) {
    returnValue += weeks * WEEKS;
  }
  if (days != null) {
    returnValue += days * DAYS;
  }
  if (hours != null) {
    returnValue += hours * HOURS;
  }
  if (minutes != null) {
    returnValue += minutes * MINUTES;
  }
  if (seconds != null) {
    returnValue += seconds * SECONDS;
  }
  if (milliseconds != null) {
    returnValue += milliseconds;
  }

  return of(returnValue);
}
