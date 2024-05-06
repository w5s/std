import { delay } from '@w5s/async/dist/delay.js';
import type { Task } from '../Task.js';
import { wrap } from '../Task/wrap.js';

/**
 * Options to create a TaskStub
 */
export type TaskStubOptions<Value, Error> = {
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
 * const anyTask = taskStub({
 *   delayMs: 5,
 *   value: 'Helloworld'
 * });// will resolve 'Hello world' after 5 milliseconds
 *
 * const anyTask = taskStub({
 *   delayMs: 2,
 *   throwError: new Error('Not expected')
 * });// will throw an error after 2 milliseconds
 * ```
 * @param options
 */
export function taskStub<Value = never, Error = never>(options: TaskStubOptions<Value, Error>): Task<Value, Error> {
  const { canceler = () => {}, delayMs } = options;
  const isAsync = delayMs != null && delayMs >= 0;
  const base = wrap<Value, Error>(({ resolve, reject }) => {
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
      wrap<Value, Error>(async (parameters) => {
        parameters.canceler.current = canceler;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        await delay(delayMs ?? 0);
        return base.taskRun(parameters);
      })
    : base;
}
