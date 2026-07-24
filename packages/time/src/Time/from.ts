import type { Day, Hour, Minute, Month, Second, Year } from '@w5s/core-type';

import type { Time } from './Time.js';

import { of } from './of.js';

export interface TimeParameters {
  /**
   * Day of month (1-31)
   */
  day?: Day;

  /**
   * Hour of the day
   */
  hour?: Hour;

  /**
   * Number of milliseconds
   */
  millisecond?: number;

  /**
   * Minute of the hour
   */
  minute?: Minute;

  /**
   * Month number (1-12)
   */
  month?: Month;

  /**
   * Second of the minute
   */
  second?: Second;

  /**
   * Year number
   */
  year?: Year;
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
 * @param source The value to convert
 */
export function from(source: number | TimeParameters): Time {
  if (typeof source === 'number') return of(source);
  const { day = 1, hour = 0, millisecond = 0, minute = 0, month = 1, second = 0, year = 0 } = source;

  return Date.UTC(year, month - 1, day, hour, minute, second, millisecond) as Time;
}
