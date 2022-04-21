import type { Result } from './result.js';
import type { Ref } from './ref.js';
import type { Awaitable } from './type.js';

// private constructors
const TaskResult = Object.freeze({
  ok<V>(value: V): Result<V, never> {
    return { _type: 'Result/Ok', value };
  },
  error<E>(error: E): Result<never, E> {
    return { _type: 'Result/Error', error };
  },
});

/**
 * Base type for Task
 *
 * @protected
 */
export interface Task<Value, Error> {
  readonly [Task.run]: (
    /**
     * Resolve callback
     */
    resolve: (value: Value) => void,
    /**
     * Reject callback
     */
    reject: (error: Error) => void,
    /**
     * Reference to cancel function
     */
    canceler: Ref<Task.Canceler>
  ) => void;
}

/**
 * Task constructor
 *
 * @example
 * ```typescript
 * const getTime = Task(({ ok }) => ok(Date.now()));
 * const fetchTask = (url: string) => Task(({ ok, error }) => fetch(url).then(ok, error));
 * const delay = (ms: number) => Task(({ ok }) => new Promise(resolve => { setTimeout(() => resolve(ok(undefined)); }), ms));
 * ```
 * @category Constructor
 * @param sideEffect the effect function
 */
export function Task<Value, Error = never>(
  sideEffect: (resolver: {
    /**
     * Return a new ok object
     */
    ok: <VV>(value: VV) => Result<VV, never>;
    /**
     * return a new error object
     */
    error: <EE>(errorValue: EE) => Result<never, EE>;
    /**
     * Canceler setter
     */
    onCancel: (canceler: Task.Canceler) => void;
  }) => Awaitable<Result<Value, Error>>
): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return Task.wrap((_resolve, _reject, cancelerRef) => {
    cancelerRef.current = Task.defaultCanceler;
    const resultOrPromise = sideEffect({
      ok: TaskResult.ok,
      error: TaskResult.error,
      onCancel: (canceler) => {
        cancelerRef.current = canceler;
      },
    });
    const handleResult = (result: Result<Value, Error>) => {
      if (result._type === 'Result/Ok') {
        _resolve(result.value);
      } else {
        _reject(result.error);
      }
    };
    return isPromiseLike(resultOrPromise) ? resultOrPromise.then(handleResult) : handleResult(resultOrPromise);
  });
}
export namespace Task {
  /**
   * String symbol to contain the execution of the side effect.
   * It is long to discourage the direct use of `task['Task/run']()`
   * Type `string` was chosen over a `symbol` so it is "less opaque" and compatible even for older browser
   */
  export const run = 'Task/run';

  /**
   * Interface used to cancel running task
   */
  export interface Canceler {
    (): void;
  }

  /**
   * An empty function representing that can be used for non cancelable tasks
   */
  export const defaultCanceler: Canceler = () => {};

  /**
   * Base Task constructor
   * Prefer {@link Task} for convenience
   *
   * @protected
   * @param taskRun the side effect function
   */
  export function wrap<Value, Error>(
    taskRun: (
      /**
       * Resolve callback
       */
      resolve: (value: Value) => void,
      /**
       * Reject callback
       */
      reject: (error: Error) => void,
      /**
       * Canceler reference
       */
      canceler: Ref<Task.Canceler>
    ) => void
  ): Task<Value, Error> {
    return {
      [run]: taskRun,
    };
  }

  /**
   * Return `true` if anyValue is a valid `Task`
   *
   * @example
   * ```typescript
   * Task.hasInstance(Task.resolve(...)); // true
   * Task.hasInstance({}); // false
   * ```
   * @category Guard
   * @param anyValue a tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is Task<unknown, unknown> {
    return isObject(anyValue) && typeof anyValue[run] === 'function';
  }

  /**
   * Constructor that always returns a successful `Task` that resolves `value`.
   * This is a shorthand for `Task(({ ok }) => ok(value))`
   *
   * @example
   * ```typescript
   * const task = Task.resolve(1);
   * const result = Task.unsafeRun(task);// Result.Ok(1)
   * ```
   * @category Constructor
   * @param value the success value
   */
  export function resolve<Value, Error = never>(value: Value): Task<Value, Error> {
    return wrap((resolveTask) => resolveTask(value));
  }

  /**
   * Constructor that always returns a failed `Task` that rejects `error`.
   * This is a shorthand for `Task(({ error }) => error(errorValue))`
   *
   * @example
   * ```typescript
   * const task = Task.reject(1);
   * const result = Task.unsafeRun(task);// Result.Error(1)
   * ```
   * @category Constructor
   * @param errorValue the error value
   */
  export function reject<Value = never, Error = never>(errorValue: Error): Task<Value, Error> {
    return wrap((_, _reject) => _reject(errorValue));
  }

  /**
   * Creates a new `Task` that resolves `sideEffect()`.
   * When an exception is thrown then it rejects `onError([thrown error])`.
   *
   * @example
   * ```typescript
   * const class FetchError extends Error {}
   * const task = Task.tryCall(
   *  () => fetch('my/url'),
   *  (error) => new FetchError()
   * );
   * ```
   * @param sideEffect A function that will be called
   * @param onError An error handler that transforms `unknown` to a normalized and typed error
   */
  export function tryCall<Value, Error>(
    sideEffect: () => Awaitable<Value>,
    onError: (error: unknown) => Awaitable<Error>
  ): Task<Value, Error> {
    return Task(async ({ ok, error }) => {
      try {
        return ok(await sideEffect());
      } catch (error_: unknown) {
        return error(await onError(error_));
      }
    });
  }

  /**
   * Maps a `Task<Value, Error>` to `Task<NewValue, Error>` by applying a function to a success value, leaving a failure untouched.
   * This function can be used to compose the results of two functions.
   *
   * @example
   * ```typescript
   * const task = Task.resolve('foo');
   * Task.map(task, (value) => `${value}_bar`));// Task.resolve('foo_bar')
   * ```
   * @param task a Task object
   * @param fn the mapper function
   */
  export function map<ValueFrom, ValueTo, Error>(
    task: Task<ValueFrom, Error>,
    fn: (value: ValueFrom) => ValueTo
  ): Task<ValueTo, Error> {
    return wrap<ValueTo, Error>((resolveTask, rejectTask, cancelerRef) =>
      task[run]((value) => resolveTask(fn(value)), rejectTask, cancelerRef)
    );
  }

  /**
   * Maps a `Task<Value, ErrorFrom>` to `Task<Value, ErrorTo>` by applying a function to a contained failure error, leaving a success value untouched.
   * This function can be used to pass through a successful result while handling an error.
   *
   * @example
   * ```typescript
   * const task = Task.reject('error');
   * Task.mapError(task, (value) => `${value}_bar`));// Task.reject('error_bar')
   * ```
   * @param task a Task object
   * @param fn the error mapper function
   */
  export function mapError<Value, ErrorFrom, ErrorTo>(
    task: Task<Value, ErrorFrom>,
    fn: (error: ErrorFrom) => ErrorTo
  ): Task<Value, ErrorTo> {
    return wrap<Value, ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task[run](resolveTask, (error) => rejectTask(fn(error)), cancelerRef)
    );
  }

  /**
   * Calls `fn` if the task is successful, otherwise returns the failed task untouched.
   * This function can be used for control flow based on `Task` values.
   *
   * @example
   * ```typescript
   * const success = Task.resolve('foo');
   * Task.andThen(success, (value) => Task.resolve(`${value}_then`));// Task.resolve('foo_then')
   *
   * const failure = Task.reject('PreviousError');
   * Task.andThen(failure, (value) => Task.resolve(`never_used`));// Task.reject('PreviousError')
   * ```
   * @param task a Task object
   * @param fn the value mapper function
   */
  export function andThen<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<ValueFrom, ErrorFrom>,
    fn: (value: ValueFrom) => Task<ValueTo, ErrorTo>
  ): Task<ValueTo, ErrorFrom | ErrorTo> {
    return wrap<ValueTo, ErrorFrom | ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task[run]((value) => fn(value)[run](resolveTask, rejectTask, cancelerRef), rejectTask, cancelerRef)
    );
  }

  /**
   * Similar to {@link andThen} but the task keep `task` resolved value
   *
   * @example
   * ```typescript
   * const success = Task.resolve('foo');
   * Task.andRun(success, (value) => Console.log('result=', value));// console.log('result=foo'); then resolves 'foo'
   * Task.andRun(success, (value) => Task.reject(`SomeError`));// Task.reject('SomeError')
   *
   * const failure = Task.reject('PreviousError');
   * Task.andRun(failure, (value) => Task.resolve(`never_used`));// Task.reject('PreviousError')
   * ```
   * @param task a Task object
   * @param fn the value mapper function
   */
  export function andRun<Value, ErrorFrom, ErrorTo>(
    task: Task<Value, ErrorFrom>,
    fn: (value: Value) => Task<any, ErrorTo>
  ): Task<Value, ErrorFrom | ErrorTo> {
    return andThen(task, (value) => map(fn(value), () => value));
  }

  /**
   * Calls `fn` if the task is failed, otherwise returns the successful task untouched.
   * This function can be used for control flow based on `Task` values.
   *
   * @example
   * ```typescript
   * const success = Task.resolve('foo');
   * Task.orElse(success, (value) => Task.resolve(`never_used`));// Task.resolve('foo')
   *
   * const failure = Task.reject('PreviousError');
   * Task.orElse(failure, (error) => Task.reject(`${value}_caught`));// Task.reject('PreviousError_caught')
   * ```
   * @param task a Task object
   * @param fn the error mapper function
   */
  export function orElse<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<ValueFrom, ErrorFrom>,
    fn: (error: ErrorFrom) => Task<ValueTo, ErrorTo>
  ): Task<ValueFrom | ValueTo, ErrorTo> {
    return wrap<ValueFrom | ValueTo, ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task[run](resolveTask, (error) => fn(error)[run](resolveTask, rejectTask, cancelerRef), cancelerRef)
    );
  }

  /**
   * Run `task` and return the result or a promise of the result
   *
   * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
   * @example
   * ```typescript
   * const getMessage = Task.resolve('Hello World!');
   * const messageResult = Task.unsafeRun(getMessage);// Result.Ok('Hello World!')
   * ```
   * @param task the task to be run
   */
  export function unsafeRun<Value, Error>(task: Task<Value, Error>): Awaitable<Result<Value, Error>> {
    const cancelerRef: Ref<() => void> = { current: Task.defaultCanceler };
    let returnValue: Result<Value, Error> | undefined;
    let resolveHandler = (result: Result<Value, Error>) => {
      returnValue = result;
    };
    let rejectHandler = (_error: unknown) => {};
    const runValue: void | Promise<void> = task[Task.run](
      (value) => resolveHandler(TaskResult.ok(value)),
      (error) => resolveHandler(TaskResult.error(error)),
      cancelerRef
    );
    // Try to catch promise errors
    if (isPromise(runValue)) {
      runValue.catch((error) => rejectHandler(error));
    }
    if (returnValue === undefined) {
      return new Promise<Result<Value, Error>>((resolvePromise, rejectPromise) => {
        resolveHandler = resolvePromise;
        rejectHandler = rejectPromise;
      });
    }

    return returnValue;
  }
}

function isObject(anyValue: unknown): anyValue is Record<string, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
function isPromiseLike<V>(anyValue: unknown): anyValue is PromiseLike<V> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function';
}
function isPromise<V>(anyValue: unknown): anyValue is Promise<V> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
}
