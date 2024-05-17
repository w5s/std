import type { Task } from '@w5s/core';
import { from } from '@w5s/core/dist/Task/from.js';
import type { TimeDuration } from '../TimeDuration.js';
import type { Time } from './Time.js';

// Call a function as a microtask
const callImmediate: typeof globalThis.queueMicrotask =
  // eslint-disable-next-line promise/prefer-await-to-then
  typeof queueMicrotask === 'undefined' ? (fn) => Promise.resolve().then(fn) : queueMicrotask;

/**
 * Return a new `Task` that resolves the current time in milliseconds after waiting `duration`.
 *
 * @example
 * ```typescript
 * const wait2s = Time.delay(TimeDuration.seconds(2));
 * const logTime = Task.andThen(wait2s, (time) => Console.debug(time));
 * Task.unsafeRun(logTime);// wait 2 seconds then console.debug(Date.now())
 * ```
 * @param duration - delay in milliseconds to wait
 */
export function delay(duration: TimeDuration): Task<Time, never> {
  return from(({ resolve, canceler }) => {
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
}
