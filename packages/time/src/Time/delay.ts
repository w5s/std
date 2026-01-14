import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import type { TimeDuration } from '../TimeDuration.js';
import type { Time } from './Time.js';

/**
 * Return a new `Task` that resolves the current time in milliseconds after waiting `duration`.
 *
 * @example
 * ```typescript
 * const wait2s = Time.delay(TimeDuration({ seconds: 2 }));
 * const logTime = Task.andThen(wait2s, (time) => Console.debug(time));
 * Task.run(logTime);// wait 2 seconds then console.debug(Date.now())
 * ```
 * @param duration - delay in milliseconds to wait
 */
export function delay(duration: TimeDuration): Task<Time, never> {
  return from(async ({ resolve, canceler }) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    // Set Canceler
    canceler.addEventListener('abort', () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    });
    // Wait delay
    await new Promise<void>((_resolve) => {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        _resolve();
      }, duration as number);
    });
    // Then resolve
    await resolve(Date.now() as Time);
  });
}
