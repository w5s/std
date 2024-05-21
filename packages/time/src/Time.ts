import { TimeDuration } from './TimeDuration.js';
import { Time as TimeType } from './Time/Time.js';
import { of } from './Time/of.js';
import { now } from './Time/now.js';
import { delay } from './Time/delay.js';
import { parse } from './Time/parse.js';
import { format } from './Time/format.js';
import { TimeComparable } from './Time/TimeComparable.js';
import { TimeBounded } from './Time/TimeBounded.js';

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = TimeType;

/**
 * A collection of functions to manipulate time (i.e timestamp)
 *
 * @namespace
 */
export const Time = Object.assign(TimeType, {
  ...TimeComparable,
  ...TimeBounded,
  of,
  now,
  delay,
  parse,
  format,

  /**
   * Adds `duration` to `time`
   *
   * @example
   * ```typescript
   * const now = Time.of(0);
   * const duration = TimeDuration.of(10);
   * Time.add(now, duration);// now + 10ms
   * ```
   * @param time - A time value
   * @param duration - A duration value
   */
  add(time: Time, duration: TimeDuration): Time {
    return Time.of((time as number) + (duration as number));
  },

  /**
   * Return the difference between 2 time values
   *
   * @example
   * ```typescript
   * const begin = Time.of(0);
   * const end = Time.of(10);
   * Time.diff(end, begin);// TimeDuration.of(10)
   * ```
   * @param left - A time value
   * @param right - A time value
   */
  diff(left: Time, right: Time): TimeDuration {
    return TimeDuration.of(left - right);
  },
});
