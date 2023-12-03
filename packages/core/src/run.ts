import type { Result } from './result.js';
import type { Task, TaskCanceler } from './task.js';
import type { Awaitable } from './type.js';

// Inline utilities
const isObject = (anyValue: unknown): anyValue is Record<string, unknown> =>
  typeof anyValue === 'object' && anyValue !== null;
const isPromise = <V>(anyValue: unknown): anyValue is Promise<V> =>
  isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
const returnOrThrow = <V, E>(result: Result<V, E>): V => {
  if (result.ok) {
    return result.value;
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw result.error;
};

/**
 * Run `task` and return the result or a promise of the result
 *
 * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = unsafeRun(getMessage);// Result.Ok('Hello World!')
 * ```
 * @param task - the task to be run
 */
export function unsafeRun<Value, Error>(
  task: Task<Value, Error>,
  canceler: TaskCanceler = { current: undefined }
): Awaitable<Result<Value, Error>> {
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};
  const runValue: void | Promise<void> = task.taskRun({
    resolve: (value) => resolveHandler({ _: 'Ok', ok: true, value }),
    reject: (error) => resolveHandler({ _: 'Error', ok: false, error }),
    canceler,
    run: unsafeRun,
  });
  // Try to catch promise errors
  if (isPromise(runValue)) {
    // eslint-disable-next-line promise/prefer-await-to-then
    runValue.catch((error) => rejectHandler(error));
  }
  if (returnValue === undefined) {
    // eslint-disable-next-line promise/param-names
    return new Promise<Result<Value, Error>>((resolvePromise, rejectPromise) => {
      resolveHandler = resolvePromise;
      rejectHandler = rejectPromise;
    });
  }

  return returnValue;
}

/**
 * Run `task` that never fails and return the value or a promise of the value
 *
 * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
 * @example
 * ```typescript
 * const getMessage = Task.resolve('Hello World!');
 * const messageResult = unsafeRunOk(getMessage);// 'Hello World!'
 * ```
 * @param task - the task to be run
 */
export function unsafeRunOk<Value>(task: Task<Value, unknown>, canceler?: TaskCanceler): Awaitable<Value> {
  const promiseOrValue = unsafeRun(task, canceler);
  // @ts-ignore - we assume PromiseLike.then returns a Promise
  // eslint-disable-next-line promise/prefer-await-to-then
  return isPromise(promiseOrValue) ? promiseOrValue.then(returnOrThrow) : returnOrThrow(promiseOrValue);
}