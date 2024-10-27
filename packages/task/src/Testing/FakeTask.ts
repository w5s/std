import { delay } from '@w5s/async/dist/delay.js';
import type { Task } from '../Task.js';
import { from } from '../Task/from.js';

/**
 * Options to create a TaskStub
 */
export type FakeTaskOptions<Value, Error> = {
  /**
   * Default Canceler function
   */
  canceler?: () => void;
  /**
   * Waiting delay in milliseconds before resolving/rejecting/throwing
   */
  delayMs?: number;
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
 * Create a new {@link @w5s/core!Task} from `options`
 *
 * @example
 * ```ts
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
    ? // eslint-disable-next-line @typescript-eslint/no-misused-promises
      from<Value, Error>(async (parameters) => {
        parameters.canceler.current = canceler;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        await delay(delayMs ?? 0);
        return base.taskRun(parameters);
      })
    : base;
}
