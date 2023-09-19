import type { Task } from '../task.js';

const waitMs = (ms: number) =>
  ms === 0
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
      });

/**
 * Options to create a TaskStub
 */
export type TaskStubOptions<Value, Error> = {
  /**
   * Default Canceler function
   */
  canceler?: () => void;
  /**
   * Waiting delay before resolving/rejecting/throwing
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
 * @param options
 */
export function taskStub<Value = never, Error = never>(options: TaskStubOptions<Value, Error>): Task<Value, Error> {
  const { canceler = () => {}, delayMs } = options;
  const isAsync = delayMs != null && delayMs >= 0;
  const base = {
    taskRun: ({ resolve, reject }) => {
      if ('value' in options) {
        resolve(options.value);
      } else if ('error' in options) {
        reject(options.error);
      } else {
        throw options.throwError;
      }
    },
  } satisfies Task<Value, Error>;

  return isAsync === true
    ? ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        taskRun: async (parameters) => {
          parameters.canceler.current = canceler;
          await waitMs(delayMs ?? 0);
          return base.taskRun(parameters);
        },
      } satisfies Task<Value, Error>)
    : base;
}
