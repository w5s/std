import { invariant } from '@w5s/invariant';
import type { Option, Task, Tag } from '@w5s/core';
import { TimeDuration } from './timeDuration.js';

// Inline private constructor
const createTask = <V, E>(fn: Task<V, E>['taskRun']): Task<V, E> => ({
  taskRun: fn,
});
// Call a function as a microtask
const callImmediate: typeof globalThis.queueMicrotask =
  // eslint-disable-next-line promise/prefer-await-to-then
  typeof queueMicrotask === 'undefined' ? (fn) => Promise.resolve().then(fn) : queueMicrotask;
const now = createTask(({ resolve }) => resolve(Date.now() as Time)) satisfies Task<Time, never>;

/**
 * Represent a time typically returned by `Date.now()`
 */
export type Time = Tag<number, { time: 'ms' }>;

/**
 * A collection of functions to manipulate time (i.e timestamp)
 *
 * @namespace
 */
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
   * const program = () => Task.andThen(Time.now(), (currentTime) => {
   *   // use currentTime
   * });
   * ```
   */
  now(): Task<Time, never> {
    return now;
  },

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
    return createTask(({ resolve, canceler }) => {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      if (duration <= 0) {
        callImmediate(() => resolve(Date.now() as Time));
      } else {
        // Set Canceler
        canceler.current = () => {
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
