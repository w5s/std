import { invariant } from './invariant.js';
import type { Option } from './option.js';
import type { Task } from './task.js';
import type { Tag } from './type.js';

// Inline private constructor
const createTask: typeof Task.wrap = (fn) => ({
  taskRun: fn,
});
// Call a function as a microtask
const callImmediate: typeof globalThis.queueMicrotask =
  // eslint-disable-next-line promise/prefer-await-to-then
  typeof queueMicrotask === 'undefined' ? (fn) => Promise.resolve().then(fn) : queueMicrotask;

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

/**
 * Represent a duration in milliseconds
 */
export type TimeDuration = Tag<number, { timeDuration: 'ms' }>;

/**
 * A collection of functions to manipulate time duration (i.e amount of milliseconds)
 *
 * @namespace
 */
export const TimeDuration = {
  /**
   * Return a duration from a number
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.of(0);// typeof duration === 'number'
   * ```
   * @category Constructor
   * @param milliseconds - Number of milliseconds
   */
  of(milliseconds: number) {
    invariant(TimeDuration.hasInstance(milliseconds), `${milliseconds} is not a valid duration value`);

    return milliseconds;
  },

  /**
   * Return `true` if `anyValue` is a valid `TimeDuration` value
   *
   * @example
   * ```typescript
   * TimeDuration.hasInstance(null); // === false
   * TimeDuration.hasInstance(TimeDuration.of(0)); // === true
   * ```
   * @category Guard
   * @param anyValue - the tested value
   */
  hasInstance(anyValue: unknown): anyValue is TimeDuration {
    return typeof anyValue === 'number' && !Number.isNaN(anyValue);
  },

  /**
   * Return a duration of `amount` milliseconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.milliseconds(1);// 1
   * ```
   * @category Constructor
   * @param amount - Number of milliseconds
   */
  milliseconds(amount: number) {
    return TimeDuration.of(amount);
  },

  /**
   * Return a duration of `amount` seconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.seconds(1);// 1000
   * ```
   * @category Constructor
   * @param amount - Number of seconds
   */
  seconds(amount: number) {
    return TimeDuration.of(amount * SECONDS);
  },

  /**
   * Return a duration of `amount` minutes
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.minutes(1);// 1000 * 60
   * ```
   * @category Constructor
   * @param amount - Number of minutes
   */
  minutes(amount: number) {
    return TimeDuration.of(amount * MINUTES);
  },

  /**
   * Return a duration of `amount` hours
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.hours(1);// 1000 * 60 * 60
   * ```
   * @category Constructor
   * @param amount - Number of hours
   */
  hours(amount: number) {
    return TimeDuration.of(amount * HOURS);
  },

  /**
   * Return a duration of `amount` days
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.days(1);// 1000 * 60 * 60 * 24
   * ```
   * @category Constructor
   * @param amount - Number of days
   */
  days(amount: number) {
    return TimeDuration.of(amount * DAYS);
  },
};

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = Tag<number, { time: 'ms' }>;

export const Time = {
  /**
   * Create a new Time value
   *
   * @example
   * ```typescript
   * const time = Time.of(0);
   * ```
   * @category Constructor
   * @param milliseconds - the value in milliseconds
   */
  of(milliseconds: number): Time {
    invariant(Time.hasInstance(milliseconds), `${milliseconds} is not a valid time value`);

    return milliseconds;
  },

  /**
   * Return `true` if `anyValue` is a valid `Time` value
   *
   * @example
   * ```typescript
   * Time.hasInstance(null); // === false
   * Time.hasInstance(Time.of(0)); // === true
   * ```
   * @category Guard
   * @param anyValue - the tested value
   */
  hasInstance(anyValue: unknown): anyValue is Time {
    return typeof anyValue === 'number' && anyValue >= 0 && !Number.isNaN(anyValue);
  },

  /**
   * Parse an ISO 8601 string. If invalid, returns `Option.None`
   *
   * @example
   * ```typescript
   * Time.parseISOString('1970-01-01T00:00:00.000Z');// 0
   * ```
   * @param str - an expression
   */
  parseISOString(str: string): Option<Time> {
    const time = Date.parse(str);

    return Number.isNaN(time) ? undefined : (time as Time);
  },

  /**
   * Return an ISO 8601 string representation
   *
   * @example
   * ```typescript
   * const time = Time.of(0);
   * Time.toISOString(time);// '1970-01-01T00:00:00.000Z'
   * ```
   * @param time - A time value
   */
  toISOString(time: Time): string {
    return new Date(time).toISOString();
  },

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
  now: createTask((resolve) => resolve(Date.now() as Time)) satisfies Task<Time, never>,

  /**
   * Return a new `Task` that resolves the current time in milliseconds after waiting `duration`.
   *
   * @example
   * ```typescript
   * const wait2s = Time.delay(TimeDuration.seconds(2));
   * const logTime = Task.andThen(wait2s, (time) => Console.debug(time));
   * unsafeRun(logTime);// wait 2 seconds then console.debug(Date.now())
   * ```
   * @param duration - delay in milliseconds to wait
   */
  delay(duration: TimeDuration): Task<Time, never> {
    return createTask((resolve, _reject, cancelerRef) => {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      if (duration <= 0) {
        callImmediate(() => resolve(Date.now() as Time));
      } else {
        // Set Canceler
        cancelerRef.current = () => {
          if (timeoutId != null) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
          }
        };
        // Run timeout
        timeoutId = setTimeout(() => {
          timeoutId = undefined;
          resolve(Date.now() as Time);
        }, duration);
      }
    });
  },
};
