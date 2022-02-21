import { Result } from './result.js';
import type { Ref } from './ref.js';
import type { Awaitable } from './type.js';

type NonPromise<V> = Exclude<V, Promise<unknown>>;

type AnyType = 'async' | 'sync';
type CombineType<Type extends AnyType> = Type extends 'sync' ? 'sync' : AnyType;

/**
 * Base type for Task
 *
 * @protected
 */
export interface Task<Type extends AnyType, Value, Error> {
  readonly [Task.type]: Type;
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
 * Base Task constructor
 * Prefer {@link Task.Sync} and {@link Task.Async} for convenience
 *
 * @protected
 * @param taskType the type that can be either 'sync' or 'async'
 * @param taskRun the side effect function
 */
export function Task<Type extends AnyType, Value, Error>(
  taskType: Type,
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
): Task<Type, Value, Error> {
  return {
    [Task.type]: taskType,
    [Task.run]: taskRun,
  };
}

export namespace Task {
  /**
   * Task Ok result interface (used in task constructor)
   */
  export interface OkResult<V> {
    ok: true;
    value: V;
  }
  /**
   * Task Error result interface (used in task constructor)
   */
  export interface ErrorResult<E> {
    ok: false;
    error: E;
  }
  /**
   * Either Ok or Error result (used in task constructor)
   */
  export type Result<V, E> = OkResult<V> | ErrorResult<E>;

  // private constructors
  const TaskResult = Object.freeze({
    ok<V>(value: V): Task.Result<V, never> {
      return { ok: true, value };
    },
    error<E>(error: E): Task.Result<never, E> {
      return { ok: false, error };
    },
  });

  /**
   * String symbol to contain the execution of the side effect.
   * It is long to discourage the direct use of `task['Task/run']()`
   * Type `string` was chosen over a `symbol` so it is "less opaque" and compatible even for older browser
   */
  export const run = 'Task/run';

  /**
   * String symbol representing 'async' or 'sync' task
   */
  export const type = 'Task/type';

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

  export interface Sync<Value, Error> extends Task<'sync', Value, Error> {}

  /**
   * Synchronous task constructor.
   *
   * @example
   * ```typescript
   * const getTime = Task.Sync(({ ok }) => ok(Date.now()));
   * const random = Task.Sync(({ ok }) => ok(Math.random()));
   * ```
   * @category Constructor
   * @param sideEffect the effect function
   */
  export function Sync<Value, Error = never>(
    sideEffect: (resolver: {
      /**
       * Return a new ok object
       */
      ok: <VV>(value: VV) => Task.Result<VV, never>;
      /**
       * Return a new error object
       */
      error: <EE>(errorValue: EE) => Task.Result<never, EE>;
    }) => Task.Result<Value, Error>
  ): Sync<Value, Error> {
    return Task('sync', (_resolve, _reject, cancelerRef) => {
      // Drop cancelerRef because Sync task are not cancelable
      cancelerRef.current = defaultCanceler;
      const result = sideEffect(TaskResult);
      if (result.ok) {
        _resolve(result.value);
      } else {
        _reject(result.error);
      }
    });
  }

  export namespace Sync {
    /**
     * Return `true` if anyValue is a valid `Task.Sync`
     *
     * @example
     * ```typescript
     * Task.Sync.hasInstance(Task.Sync.resolve(...)); // true
     * Task.Sync.hasInstance({}); // false
     * ```
     * @category Guard
     * @param anyValue
     */
    export function hasInstance(anyValue: unknown): anyValue is Task.Sync<unknown, unknown> {
      return isObject(anyValue) && anyValue[type] === 'sync' && typeof anyValue[run] === 'function';
    }

    /**
     * Constructor that always returns a successful `Task` that resolves `value`.
     * This is a shorthand for `Task.Sync(({ ok }) => ok(value))`
     *
     * @example
     * ```typescript
     * const task = Task.Sync.resolve(1);
     * const result = runTask(task);// Result.Ok(1)
     * ```
     * @category Constructor
     * @param value the success value
     */
    export function resolve<Value, Error = never>(value: Value): Task.Sync<Value, Error> {
      return Sync(({ ok }) => ok(value));
    }

    /**
     * Constructor that always returns a failed `Task` that rejects `error`.
     * This is a shorthand for `Task.Sync(({ error }) => error(errorValue))`
     *
     * @example
     * ```typescript
     * const task = Task.Sync.reject(1);
     * const result = runTask(task);// Result.Error(1)
     * ```
     * @category Constructor
     * @param errorValue the error value
     */
    export function reject<Value = never, Error = never>(errorValue: Error): Task.Sync<Value, Error> {
      return Sync(({ error }) => error(errorValue));
    }

    /**
     * Creates a new `Task.Sync` that resolves `sideEffect()`.
     * When an exception is thrown or promise rejected then it rejects `onError([thrown error])`.
     *
     * @example
     * ```typescript
     * const class InvalidURLError extends Error {}
     * const task = Task.Sync.tryCall(
     *  () => new URL('my/url'),
     *  (error) => new InvalidURLError()
     * );
     * ```
     *
     * @param sideEffect A function that will be called
     * @param onError An error handler that transforms `unknown` to a normalized and typed error
     */
    export function tryCall<Value, Error>(
      sideEffect: () => NonPromise<Value>,
      onError: (error: unknown) => Error
    ): Sync<Value, Error> {
      return Sync(({ ok, error }) => {
        try {
          return ok(sideEffect());
        } catch (error_: unknown) {
          return error(onError(error_));
        }
      });
    }
  }

  export interface Async<Value, Error> extends Task<'async', Value, Error> {}

  /**
   * Asynchronous task constructor
   *
   * @example
   * ```typescript
   * const fetchTask = (url: string) => Task.Async(({ ok, error }) => fetch(url).then(ok, error));
   * const delay = (ms: number) => Task.Async(({ ok }) => new Promise(resolve => { setTimeout(() => resolve(ok(undefined)); }), ms));
   * ```
   * @category Constructor
   * @param sideEffect the effect function
   */
  export function Async<Value, Error = never>(
    sideEffect: (resolver: {
      /**
       * Return a new ok object
       */
      ok: <VV>(value: VV) => Task.Result<VV, never>;
      /**
       * return a new error object
       */
      error: <EE>(errorValue: EE) => Task.Result<never, EE>;
      /**
       * Canceler setter
       */
      onCancel: (canceler: Canceler) => void;
    }) => Awaitable<Task.Result<Value, Error>>
  ): Async<Value, Error> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return Task('async', async (_resolve, _reject, cancelerRef) => {
      cancelerRef.current = defaultCanceler;
      const result = await sideEffect({
        ok: TaskResult.ok,
        error: TaskResult.error,
        onCancel: (canceler) => {
          cancelerRef.current = canceler;
        },
      });
      if (result.ok) {
        _resolve(result.value);
      } else {
        _reject(result.error);
      }
    });
  }

  export namespace Async {
    /**
     * Return `true` if anyValue is a valid `Task.Async`
     *
     * @example
     * ```typescript
     * Task.Async.hasInstance(Task.Async.resolve(...)); // true
     * Task.Async.hasInstance({}); // false
     * ```
     * @category Guard
     * @param anyValue
     */
    export function hasInstance(anyValue: unknown): anyValue is Task.Async<unknown, unknown> {
      return isObject(anyValue) && anyValue[type] === 'async' && typeof anyValue[run] === 'function';
    }

    /**
     * Constructor that always returns a successful `Task` that resolves `value`.
     * This is a shorthand for `Task.Async(({ ok }) => ok(value))`
     *
     * @example
     * ```typescript
     * const task = Task.Async.resolve(1);
     * const result = await runTask(task);// Result.Ok(1)
     * ```
     * @category Constructor
     * @param value the success value
     */
    export function resolve<Value, Error = never>(value: Value): Task.Async<Value, Error> {
      return Async(({ ok }) => ok(value));
    }

    /**
     * Constructor that always returns a failed `Task` that rejects `error`.
     * This is a shorthand for `Task.Async(({ error }) => error(errorValue))`
     *
     * @example
     * ```typescript
     * const task = Task.Async.reject(1);
     * const result = await runTask(task);// Result.Error(1)
     * ```
     * @category Constructor
     * @param errorValue the error value
     */
    export function reject<Value = never, Error = never>(errorValue: Error): Task.Async<Value, Error> {
      return Async(({ error }) => error(errorValue));
    }

    /**
     * Creates a new `Task.Async` that resolves `sideEffect()`.
     * When an exception is thrown then it rejects `onError([thrown error])`.
     *
     * @example
     * ```typescript
     * const class FetchError extends Error {}
     * const task = Task.Async.tryCall(
     *  () => fetch('my/url'),
     *  (error) => new FetchError()
     * );
     * ```
     *
     * @param sideEffect A function that will be called
     * @param onError An error handler that transforms `unknown` to a normalized and typed error
     */
    export function tryCall<Value, Error>(
      sideEffect: () => Awaitable<Value>,
      onError: (error: unknown) => Awaitable<Error>
    ): Async<Value, Error> {
      return Async(async ({ ok, error }) => {
        try {
          return ok(await sideEffect());
        } catch (error_: unknown) {
          return error(await onError(error_));
        }
      });
    }
  }

  /**
   * Maps a `Task<Value, Error>` to `Task<NewValue, Error>` by applying a function to a success value, leaving a failure untouched.
   * This function can be used to compose the results of two functions.
   *
   * @example
   * ```typescript
   * const task = Task.Sync.resolve('foo');
   * Task.map(task, (value) => `${value}_bar`));// Task.Sync.resolve('foo_bar')
   * ```
   *
   * @param task a Task object
   * @param fn the mapper function
   */
  export function map<Type extends AnyType, ValueFrom, ValueTo, Error>(
    task: Task<Type, ValueFrom, Error>,
    fn: (value: ValueFrom) => ValueTo
  ): Task<Type, ValueTo, Error> {
    return Task<Type, ValueTo, Error>(task[type], (_resolve, _reject, cancelerRef) =>
      task[run]((value) => _resolve(fn(value)), _reject, cancelerRef)
    );
  }

  /**
   * Maps a `Task<Value, ErrorFrom>` to `Task<Value, ErrorTo>` by applying a function to a contained failure error, leaving a success value untouched.
   * This function can be used to pass through a successful result while handling an error.
   *
   * @example
   * ```typescript
   * const task = Task.Sync.reject('error');
   * Task.mapError(task, (value) => `${value}_bar`));// Task.Sync.reject('error_bar')
   * ```
   *
   * @param task a Task object
   * @param fn the error mapper function
   */
  export function mapError<Type extends AnyType, Value, ErrorFrom, ErrorTo>(
    task: Task<Type, Value, ErrorFrom>,
    fn: (error: ErrorFrom) => ErrorTo
  ): Task<Type, Value, ErrorTo> {
    return Task<Type, Value, ErrorTo>(task[type], (_resolve, _reject, cancelerRef) =>
      task[run](_resolve, (error) => _reject(fn(error)), cancelerRef)
    );
  }

  /**
   * Calls `fn` if the task is successful, otherwise returns the failed task untouched.
   * This function can be used for control flow based on `Task` values.
   *
   * @example
   * ```typescript
   * const success = Task.Sync.resolve('foo');
   * Task.andThen(success, (value) => Task.Sync.resolve(`${value}_then`));// Task.Sync.resolve('foo_then')
   *
   * const failure = Task.Sync.reject('PreviousError');
   * Task.andThen(failure, (value) => Task.Sync.resolve(`never_used`));// Task.Sync.reject('PreviousError')
   * ```
   * @param task a Task object
   * @param fn the value mapper function
   */
  export function andThen<Type extends AnyType, ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<Type, ValueFrom, ErrorFrom>,
    fn: (value: ValueFrom) => Task<CombineType<Type>, ValueTo, ErrorTo>
  ): Task<Type, ValueTo, ErrorFrom | ErrorTo> {
    return Task<Type, ValueTo, ErrorFrom | ErrorTo>(task[type], (_resolve, _reject, cancelerRef) =>
      task[run]((value) => fn(value)[run](_resolve, _reject, cancelerRef), _reject, cancelerRef)
    );
  }

  /**
   * Similar to {@link andThen} but the task keep `task` resolved value
   *
   * @example
   * ```typescript
   * const success = Task.Sync.resolve('foo');
   * Task.andRun(success, (value) => Console.log('result=', value));// console.log('result=foo'); then resolves 'foo'
   * Task.andRun(success, (value) => Task.Sync.reject(`SomeError`));// Task.Sync.reject('SomeError')
   *
   * const failure = Task.Sync.reject('PreviousError');
   * Task.andRun(failure, (value) => Task.Sync.resolve(`never_used`));// Task.Sync.reject('PreviousError')
   * ```
   * @param task a Task object
   * @param fn the value mapper function
   */
  export function andRun<Type extends AnyType, Value, ErrorFrom, ErrorTo>(
    task: Task<Type, Value, ErrorFrom>,
    fn: (value: Value) => Task<CombineType<Type>, any, ErrorTo>
  ): Task<Type, Value, ErrorFrom | ErrorTo> {
    return andThen(task, (value) => map(fn(value), () => value));
  }

  /**
   * Calls `fn` if the task is failed, otherwise returns the successful task untouched.
   * This function can be used for control flow based on `Task` values.
   *
   * @example
   * ```typescript
   * const success = Task.Sync.resolve('foo');
   * Task.orElse(success, (value) => Task.Sync.resolve(`never_used`));// Task.Sync.resolve('foo')
   *
   * const failure = Task.Sync.reject('PreviousError');
   * Task.orElse(failure, (error) => Task.Sync.reject(`${value}_caught`));// Task.Sync.reject('PreviousError_caught')
   * ```
   * @param task a Task object
   * @param fn the error mapper function
   */
  export function orElse<Type extends AnyType, ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<Type, ValueFrom, ErrorFrom>,
    fn: (error: ErrorFrom) => Task<CombineType<Type>, ValueTo, ErrorTo>
  ): Task<Type, ValueFrom | ValueTo, ErrorTo> {
    return Task<Type, ValueFrom | ValueTo, ErrorTo>(task[type], (_resolve, _reject, cancelerRef) =>
      task[run](_resolve, (error) => fn(error)[run](_resolve, _reject, cancelerRef), cancelerRef)
    );
  }
}

/**
 * Run `task` and return the result or a promise of the result
 *
 * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
 * @example
 * ```typescript
 * const getMessage = Task.Sync.resolve('Hello World!');
 * const messageResult = runTask(getMessage);// Result.Ok('Hello World!')
 * ```
 *
 * @param task the task to be run
 */
export function runTask<Type extends AnyType, Value, Error>(
  task: Task<Type, Value, Error>
): Type extends 'async'
  ? Type extends 'sync'
    ? Awaitable<Result<Value, Error>>
    : Promise<Result<Value, Error>>
  : Result<Value, Error> {
  const cancelerRef: Ref<() => void> = { current: Task.defaultCanceler };
  const block = (resolve: (result: Result<Value, Error>) => void, reject: (err: unknown) => void) => {
    try {
      const returnValue: void | Promise<void> = task[Task.run](
        (value) => {
          resolve(Result.Ok(value));
        },
        (error) => {
          resolve(Result.Error(error));
        },
        cancelerRef
      );
      // Try to catch promise errors
      if (isPromise(returnValue)) {
        returnValue.catch(reject);
      }
    } catch (error_: unknown) {
      reject(error_);
    }
  };

  if (task[Task.type] === 'sync') {
    let returnValue: Result<Value, Error> | undefined;
    block(
      (result: Result<Value, Error>) => {
        returnValue = result;
      },
      (error) => {
        throw error;
      }
    );
    if (returnValue === undefined) {
      throw new Error('Task was never resolved nor rejected');
    }

    // @ts-expect-error return type is conditional
    return returnValue;
  }

  // @ts-expect-error return type is conditional
  return new Promise(block);
}

function isObject(anyValue: unknown): anyValue is Record<string, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
function isPromise(anyValue: unknown): anyValue is Promise<unknown> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
}
