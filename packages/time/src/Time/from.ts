import type { Year, Month, Day, Hour, Minute, Second } from '@w5s/core-type';
import { of } from './of.js';
import type { Time } from './Time.js';

export interface TimeParameters {
  /**
   * Year number
   */
  year?: Year;
  /**
   * Month number (1-12)
   */
  month?: Month;
  /**
   * Day of month (1-31)
   */
  day?: Day;
  /**
   * Hour of the day
   */
  hour?: Hour;
  /**
   * Minute of the hour
   */
  minute?: Minute;
  /**
   * Second of the minute
   */
  second?: Second;
  /**
   * Number of milliseconds
   */
  millisecond?: number;
}

/**
 * Converts a number or a TimeObject to a Time
 *
 * @example
 * ```typescript
 * Time.from({ year: 2020, month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });// new Date('2020-01-01T00:00:00.000Z').getTime()
 * ```
 *
 * @category Constructor
 * @param source - The value to convert
 */
export function from(source: number | TimeParameters): Time {
  if (typeof source === 'number') return of(source);
  const { year = 0, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0 } = source;

  return Date.UTC(year, month - 1, day, hour, minute, second, millisecond) as Time;
}
