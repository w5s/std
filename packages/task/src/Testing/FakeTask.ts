import type { Option } from '@w5s/core';
import type { Task } from '../Task.js';
import type { TaskCanceler } from '../TaskCanceler.js';
import { from } from '../Task/from.js';
import { unsafeCall } from '../Task/unsafeCall.js';

function delay(milliseconds: number, canceler: TaskCanceler): Promise<boolean> {
  return milliseconds === 0
    ? Promise.resolve(true)
    : new Promise((resolve) => {
        const timerId = setTimeout(() => resolve(true), milliseconds);
        const cancelerCurrent = canceler.current;
        canceler.current = () => {
          clearTimeout(timerId);
          cancelerCurrent?.();
          resolve(true);
        };
      });
}

/**
 * Options to create a TaskStub
 */
export type FakeTaskOptions<Value, Error> = {
  /**
   * Default Canceler function
   */
  canceler?: Option<() => void>;
  /**
   * Waiting delay in milliseconds before resolving/rejecting/throwing
   */
  delayMs?: Option<number>;
} & (
  | {
      /**
       * The value to resolve
       */
      value: Value;
    }
  | {
      /**
       * The error to reject
       */
      error: Error;
    }
  | {
      /**
       * The error to throw
       */
      throwError: unknown;
    }
);

/**
 * Create a new {@link @w5s/task!Task} from `options`
 *
 * @example
 * ```typescript
 * const anyTask = FakeTask({
 *   delayMs: 5,
 *   value: 'Hello world'
 * });// will resolve 'Hello world' after 5 milliseconds
 *
 * const anyTask = FakeTask({
 *   delayMs: 2,
 *   throwError: new Error('Not expected')
 * });// will throw an error after 2 milliseconds
 * ```
 * @param options
 */
export function FakeTask<Value = never, Error = never>(options: FakeTaskOptions<Value, Error>): Task<Value, Error> {
  const { canceler = () => {}, delayMs } = options;
  const isAsync = delayMs != null && delayMs >= 0;
  const base = from<Value, Error>(({ resolve, reject }) => {
    if ('value' in options) {
      resolve(options.value);
    } else if ('error' in options) {
      reject(options.error);
    } else {
      throw options.throwError;
    }
  });

  return isAsync === true
    ? from<Value, Error>(async (parameters) => {
        parameters.canceler.current = canceler;
        if (await delay(delayMs, parameters.canceler)) {
          return unsafeCall(base, parameters);
        }
        return undefined;
      })
    : base;
}
