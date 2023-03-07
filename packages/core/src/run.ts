import type { Option } from './option.js';
import type { Ref } from './ref.js';
import type { Result } from './result.js';
import type { Task } from './task.js';
import type { Awaitable } from './type.js';

/**
 * Interface used to cancel running task
 */
export interface Canceler extends Ref<Option<() => void>> {}

/**
 * Return a new canceler
 *
 * @example
 * @constructor
 */
export function Canceler(initialValue?: Option<() => void>): Canceler {
  return { current: initialValue };
}
export namespace Canceler {
  /**
   * Clear the current value of canceler
   *
   * @example
   * ```ts
   * const canceler: Canceler = { current: () => {} };
   * Canceler.clear(canceler);// canceler.current === undefined
   * ```
   * @param canceler
   */
  export function clear(canceler: Canceler) {
    canceler.current = undefined;
  }

  /**
   * Trigger cancelation once
   *
   * @example
   * ```ts
   * const canceler: Canceler = { current: () => { console.log('cancel'); } };
   * Canceler.cancel(canceler);// console.log('cancel');
   * Canceler.cancel(canceler);// do nothing
   * ```
   * @param canceler
   */
  export function cancel(canceler: Canceler) {
    if (canceler.current != null) {
      canceler.current();
    }
    clear(canceler);
  }
}

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
export function unsafeRun<Value, Error>(task: Task<Value, Error>): Awaitable<Result<Value, Error>> {
  const cancelerRef: Canceler = { current: undefined };
  let returnValue: Result<Value, Error> | undefined;
  let resolveHandler = (result: Result<Value, Error>) => {
    returnValue = result;
  };
  let rejectHandler = (_error: unknown) => {};
  const runValue: void | Promise<void> = task.taskRun(
    (value) => resolveHandler({ _: 'Ok', value }),
    (error) => resolveHandler({ _: 'Error', error }),
    cancelerRef
  );
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
export function unsafeRunOk<Value>(task: Task<Value, unknown>): Awaitable<Value> {
  const promiseOrValue = unsafeRun(task);
  // @ts-ignore - we assume PromiseLike.then returns a Promise
  // eslint-disable-next-line promise/prefer-await-to-then
  return isPromise(promiseOrValue) ? promiseOrValue.then(unsafeResultValue) : unsafeResultValue(promiseOrValue);
}

function unsafeResultValue<V, E>(result: Result<V, E>) {
  if (result._ === 'Ok') {
    return result.value;
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw result.error;
}

function isPromise<V>(anyValue: unknown): anyValue is Promise<V> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
}
function isObject(anyValue: unknown): anyValue is Record<string, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
