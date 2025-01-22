import { of } from './of.js';
import type { TimeDuration } from './TimeDuration.js';
import { weeks as ofWeeks } from './weeks.js';
import { days as ofDays } from './days.js';
import { hours as ofHours } from './hours.js';
import { minutes as ofMinutes } from './minutes.js';
import { seconds as ofSeconds } from './seconds.js';
import { milliseconds as ofMilliseconds } from './milliseconds.js';

export interface TimeDurationObject {
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
 * @param source - a number of milliseconds or an object with properties:
 *   - `weeks`
 *   - `days`
 *   - `hours`
 *   - `minutes`
 *   - `seconds`
 *   - `milliseconds`
 * @returns a new TimeDuration
 */
export function from(source: number | TimeDurationObject): TimeDuration {
  if (typeof source === 'number') return of(source);
  const { weeks, days, hours, minutes, seconds, milliseconds } = source;
  let returnValue = 0;
  if (weeks != null) {
    returnValue += ofWeeks(weeks);
  }
  if (days != null) {
    returnValue += ofDays(days);
  }
  if (hours != null) {
    returnValue += ofHours(hours);
  }
  if (minutes != null) {
    returnValue += ofMinutes(minutes);
  }
  if (seconds != null) {
    returnValue += ofSeconds(seconds);
  }
  if (milliseconds != null) {
    returnValue += ofMilliseconds(milliseconds);
  }

  return of(returnValue);
}
