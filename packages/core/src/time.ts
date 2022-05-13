/* eslint-disable no-bitwise */
import { invariant } from './assert.js';
import type { Option } from './option.js';
import { Task } from './task.js';
import type { Tag } from './type.js';

/**
 * Represent a duration in milliseconds
 */
export type TimeDuration = Tag<number, { timeDuration: 'ms' }>;

/**
 * Return a duration from a number
 *
 * @example
 * ```typescript
 * const duration = TimeDuration(0);// typeof duration === 'number'
 * ```
 * @param milliseconds Number of milliseconds
 */
export function TimeDuration(milliseconds: number): TimeDuration {
  invariant(TimeDuration.hasInstance(milliseconds), `${milliseconds} is not a valid duration value`);

  // eslint-disable-next-line unicorn/prefer-math-trunc
  return (milliseconds | 0) as TimeDuration;
}

export namespace TimeDuration {
  const SECONDS = 1000;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;

  /**
   * Return `true` if `anyValue` is a valid `TimeDuration` value
   *
   * @category Guard
   * @param anyValue - the tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is TimeDuration {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue);
  }

  /**
   * Return a duration of `amount` milliseconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.milliseconds(1);// 1
   * ```
   * @category Constructor
   * @param amount Number of milliseconds
   */
  export function milliseconds(amount: number) {
    return TimeDuration(amount);
  }

  /**
   * Return a duration of `amount` seconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.seconds(1);// 1000
   * ```
   * @category Constructor
   * @param amount Number of seconds
   */
  export function seconds(amount: number) {
    return TimeDuration(amount * SECONDS);
  }

  /**
   * Return a duration of `amount` minutes
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.minutes(1);// 1000 * 60
   * ```
   * @category Constructor
   * @param amount Number of minutes
   */
  export function minutes(amount: number) {
    return TimeDuration(amount * MINUTES);
  }

  /**
   * Return a duration of `amount` hours
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.hours(1);// 1000 * 60 * 60
   * ```
   * @category Constructor
   * @param amount Number of hours
   */
  export function hours(amount: number) {
    return TimeDuration(amount * HOURS);
  }

  /**
   * Return a duration of `amount` days
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.days(1);// 1000 * 60 * 60 * 24
   * ```
   * @category Constructor
   * @param amount Number of days
   */
  export function days(amount: number) {
    return TimeDuration(amount * DAYS);
  }
}

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = Tag<number, { time: 'ms' }>;

/**
 * Create a new Time value
 *
 * @category Constructor
 * @param milliseconds the value in milliseconds
 */
export function Time(milliseconds: number): Time {
  invariant(Time.hasInstance(milliseconds), `${milliseconds} is not a valid time value`);

  return milliseconds as Time;
}
export namespace Time {
  /**
   * Return `true` if `anyValue` is a valid `Time` value
   *
   * @category Guard
   * @param anyValue - the tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is Time {
    return typeof anyValue === 'number' && anyValue >= 0 && !Number.isNaN(anyValue);
  }

  /**
   * Parse an ISO 8601 string. If invalid, returns `Option.None`
   *
   * @example
   * ```typescript
   * Time.parseISOString('1970-01-01T00:00:00.000Z');// 0
   * ```
   * @param str an expression
   */
  export function parseISOString(str: string): Option<Time> {
    const time = Date.parse(str);

    return Number.isNaN(time) ? undefined : (time as Time);
  }

  /**
   * Return an ISO 8601 string representation
   *
   * @example
   * ```typescript
   * const time = Time(0);
   * Time.toISOString(time);// '1970-01-01T00:00:00.000Z'
   * ```
   * @param time A time value
   */
  export function toISOString(time: Time): string {
    return new Date(time).toISOString();
  }

  /**
   * Adds `duration` to `time`
   *
   * @example
   * ```typescript
   * const now = Time(0);
   * const duration = TimeDuration(10);
   * Time.add(now, duration);// now + 10ms
   * ```
   * @param time A time value
   * @param duration A duration value
   */
  export function add(time: Time, duration: TimeDuration): Time {
    return Time((time as number) + (duration as number));
  }

  /**
   * Return the difference between 2 time values
   *
   * @example
   * ```typescript
   * const begin = Time(0);
   * const end = Time(10);
   * Time.diff(end, begin);// TimeDuration(10)
   * ```
   * @param left A time value
   * @param right A time value
   */
  export function diff(left: Time, right: Time): TimeDuration {
    return TimeDuration(left - right);
  }

  /**
   * A task that resolves the current time in milliseconds.
   *
   * @example
   * ```typescript
   * const program = () => Task.andThen(Time.now, (currentTime) => {
   *   // use currentTime
   * });
   * ```
   */
  export const now = Task<Time, never>(({ ok }) => ok(Date.now() as Time));

  /**
   * Return a new `Task` that resolves the current time in milliseconds after waiting `duration`.
   *
   * @example
   * ```typescript
   * const wait2s = Time.delay(TimeDuration.seconds(2));
   * const logTime = Task.andThen(wait2s, (time) => Console.debug(time));
   * Task.unsafeRun(logTime);// wait 2 seconds then console.debug(Date.now())
   * ```
   * @param duration delay in milliseconds to wait
   */
  export function delay(duration: TimeDuration): Task<Time, never> {
    return Task(
      ({ ok, setCanceler }) =>
        new Promise((resolve) => {
          let timeoutId: ReturnType<typeof setTimeout> | undefined;
          // Set Canceler
          setCanceler(() => {
            if (timeoutId != null) {
              clearTimeout(timeoutId);
              timeoutId = undefined;
            }
          });
          // Run timeout
          timeoutId = setTimeout(() => {
            timeoutId = undefined;
            resolve(ok(Date.now() as Time));
          }, duration);
        })
    );
  }
}
