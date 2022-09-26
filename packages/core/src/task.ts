import type { Option } from './option.js';
import type { Result } from './result.js';
import type { Ref } from './ref.js';
import type { Awaitable } from './type.js';
import { AggregateError } from './aggregateError.js';

/**
 * Base type for Task
 */
export interface Task<Value, Error> {
  /**
   * A callback with side effets
   */
  readonly taskRun: (
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
 * const delay = (ms: number) => Task(({ ok }) => new Promise(resolve => { setTimeout(() => resolve(ok()); }), ms));
 * ```
 * @category Constructor
 * @param sideEffect - the effect function
 */
export function Task<Value, Error = never>(
  sideEffect: (resolver: {
    /**
     * Return a new ok object
     */
    ok: {
      (): Result<void, never>;
      <VV>(value: VV): Result<VV, never>;
    };
    /**
     * Return a new error object
     */
    error: {
      (): Result<never, void>;
      <EE>(errorValue: EE): Result<never, EE>;
    };
    /**
     * Canceler setter
     */
    setCanceler: (canceler: Option<Task.Canceler>) => void;
  }) => Awaitable<Result<Value, Error>>
): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return Task.wrap((resolveTask, rejectTask, cancelerRef) => {
    resetCanceler(cancelerRef);
    const resultOrPromise = sideEffect({
      ok: resultOk,
      error: resultError,
      setCanceler: (canceler) => {
        cancelerRef.current = canceler ?? Task.defaultCanceler;
      },
    });
    const handleResult = (result: Result<Value, Error>) => {
      if (result._ === 'Ok') {
        resolveTask(result.value);
      } else {
        rejectTask(result.error);
      }
    };
    // eslint-disable-next-line promise/prefer-await-to-then
    return isPromiseLike(resultOrPromise) ? resultOrPromise.then(handleResult) : handleResult(resultOrPromise);
  });
}
export namespace Task {
  /**
   * Extracts value type of task T
   */
  export type ValueType<T> = T extends Task<infer V, any> ? V : never;
  /**
   * Extracts error type of task T
   */
  export type ErrorType<T> = T extends Task<any, infer Error> ? Error : never;

  /**
   * Interface used to cancel running task
   */
  export interface Canceler {
    (): void;
  }

  /**
   * An empty function representing that can be used for non cancelable tasks
   *
   * @example
   */
  export const defaultCanceler: Canceler = () => {};

  /**
   * Base Task constructor
   * Prefer {@link Task} for convenience
   *
   * @example
   * @protected
   * @param taskRun - the side effect function
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
      taskRun,
    };
  }

  const emptyArray = Object.freeze([]);

  class TaskAggregateState<Value, Error> {
    readonly tasks: ReadonlyArray<
      Readonly<{
        task: Task<Value, Error>;
        cancelerRef: Ref<Canceler>;
      }>
    >;

    readonly taskCount: number;

    taskFinished = 0;

    constructor(tasks: Iterable<Task<Value, Error>>) {
      this.tasks = Array.from(tasks).map((task) => ({
        task,
        cancelerRef: { current: defaultCanceler },
      }));
      this.taskCount = this.tasks.length;
    }

    isFinished() {
      return this.taskFinished === this.taskCount;
    }

    finish() {
      this.taskFinished = this.taskCount;
    }

    cancelAll() {
      this.tasks.forEach((task) => triggerCanceler(task.cancelerRef));
    }

    runAll(
      resolveTask: (value: Value, entry: typeof this.tasks[0], index: number) => void,
      rejectTask: (error: Error, entry: typeof this.tasks[0], index: number) => void
    ) {
      this.tasks.forEach((entry, taskIndex) => {
        entry.task.taskRun(
          (value: Value) => {
            if (!this.isFinished()) {
              this.taskFinished += 1;
              resolveTask(value, entry, taskIndex);
            }
          },
          (error: Error) => {
            if (!this.isFinished()) {
              this.taskFinished += 1;
              rejectTask(error, entry, taskIndex);
            }
          },
          entry.cancelerRef
        );
      });
    }
  }

  /**
   * Resolves with the array of all task values, or reject with the first error
   *
   * @example
   * ```typescript
   * const success = Task.all([
   *   Task.resolve(1),
   *   Task.resolve(2),
   * ]);
   * const successResult = Task.unsafeRun(success);// Result.Ok([1, 2])
   *
   * const failure = Task.all([
   *   Task.resolve(1),
   *   Task.reject('error'),
   * ]);
   * const failureResult = Task.unsafeRun(failure);// Result.Error('error')
   * ```
   * @param tasks - tasks to be run in parallel
   */
  export function all<T extends readonly Task<any, any>[]>(
    tasks: [...T]
  ): Task<{ [K in keyof T]: ValueType<T[K]> }, ErrorType<T[keyof T]>>;
  export function all<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<ReadonlyArray<Value>, Error>;
  export function all<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<ReadonlyArray<Value>, Error> {
    return Task.wrap((taskResolve, taskReject, taskCancelerRef) => {
      const state = new TaskAggregateState(tasks);
      if (state.taskCount === 0) {
        taskResolve(emptyArray);
      } else {
        // Set global canceler
        taskCancelerRef.current = state.cancelAll.bind(state);

        // eslint-disable-next-line unicorn/no-new-array
        const values = new Array<Value | undefined>(state.taskCount);
        state.runAll(
          (value, entry, index) => {
            values[index] = value;
            if (state.isFinished()) {
              taskResolve(values as ReadonlyArray<Value>);
            }
          },
          (error: Error, entry) => {
            if (!state.isFinished()) {
              state.finish();
              taskReject(error);
              // cancel all but the current task
              resetCanceler(entry.cancelerRef);
              state.cancelAll();
            }
          }
        );
      }
    });
  }

  /**
   * Resolves with the first value, or reject with an aggregated error
   *
   * @example
   * ```typescript
   * const success = Task.any([
   *   Task.reject(1),
   *   Task.resolve(2),
   * ]);
   * const successResult = Task.unsafeRun(success);// Result.Ok(2)
   *
   * const failure = Task.any([
   *   Task.reject('error1'),
   *   Task.reject('error2'),
   * ]);
   * const failureResult = Task.unsafeRun(failure);// Result.Error(AggregateError({ errors: ['error1', 'error2']}))
   * ```
   * @param tasks - tasks to be run in parallel
   */
  export function any<T extends Task<any, any>[]>(
    tasks: [...T]
  ): Task<ValueType<T[keyof T]>, AggregateError<{ [K in keyof T]: ErrorType<T[K]> }>>;
  export function any<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<Value, AggregateError<Error[]>>;
  export function any<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<Value, AggregateError<Error[]>> {
    return Task.wrap((taskResolve, taskReject, taskCancelerRef) => {
      const state = new TaskAggregateState(tasks);

      if (state.taskCount === 0) {
        taskReject(AggregateError({ errors: [] }));
      } else {
        // Set global canceler
        taskCancelerRef.current = state.cancelAll.bind(state);

        // eslint-disable-next-line unicorn/no-new-array
        const errors = new Array<Error | undefined>(state.taskCount);
        state.runAll(
          (value, entry) => {
            if (!state.isFinished()) {
              state.finish();
              taskResolve(value);
              // cancel all but the current task
              resetCanceler(entry.cancelerRef);
              state.cancelAll();
            }
          },
          (error, entry, index) => {
            errors[index] = error;
            if (state.isFinished()) {
              taskReject(AggregateError({ errors: errors as Error[] }));
            }
          }
        );
      }
    });
  }

  /**
   * Resolves an array of all task results
   *
   * @example
   * ```typescript
   * const task = Task.allSettled([
   *   Task.reject(1),
   *   Task.resolve(2),
   * ]);
   * const taskResults = Task.unsafeRun(task);// [Result.Error(1), Result.Ok(2)]
   * ```
   * @param tasks - tasks to be run in parallel
   */
  export function allSettled<T extends Task<any, any>[]>(
    tasks: [...T]
  ): Task<{ [K in keyof T]: Result<ValueType<T[K]>, ErrorType<T[K]>> }, never>;
  export function allSettled<Value, Error>(
    tasks: Iterable<Task<Value, Error>>
  ): Task<ReadonlyArray<Result<Value, Error>>, never>;
  export function allSettled<Value, Error>(
    tasks: Iterable<Task<Value, Error>>
  ): Task<ReadonlyArray<Result<Value, Error>>, never> {
    return Task.wrap((taskResolve, _taskReject, _taskCancelerRef) => {
      const state = new TaskAggregateState(tasks);
      if (state.taskCount === 0) {
        taskResolve(emptyArray);
      } else {
        // eslint-disable-next-line unicorn/no-new-array
        const results = new Array<Result<Value, Error>>(state.taskCount);
        const finish = () => {
          if (state.isFinished()) {
            taskResolve(Object.freeze(results));
          }
        };
        state.runAll(
          (value, entry, index) => {
            results[index] = resultOk(value);
            finish();
          },
          (error, entry, index) => {
            results[index] = resultError(error);
            finish();
          }
        );
      }
    });
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
   * @param anyValue - a tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is Task<unknown, unknown> {
    return isObject(anyValue) && typeof anyValue['taskRun'] === 'function';
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
   * @param value - the success value
   */
  export function resolve<Error = never>(): Task<void, Error>;
  export function resolve<Value, Error = never>(value: Value): Task<Value, Error>;
  export function resolve<Error = never>(value?: unknown): Task<unknown, Error> {
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
   * @param errorValue - the error value
   */
  export function reject<Value = never>(): Task<Value, void>;
  export function reject<Value = never, Error = never>(errorValue: Error): Task<Value, Error>;
  export function reject<Value = never>(errorValue?: unknown): Task<Value, unknown> {
    return wrap((_, rejectTask) => rejectTask(errorValue));
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
   * @param sideEffect - A function that will be called
   * @param onError - An error handler that transforms `unknown` to a normalized and typed error
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
   * @param task - a Task object
   * @param fn - the mapper function
   */
  export function map<ValueFrom, ValueTo, Error>(
    task: Task<ValueFrom, Error>,
    fn: (value: ValueFrom) => ValueTo
  ): Task<ValueTo, Error> {
    return wrap<ValueTo, Error>((resolveTask, rejectTask, cancelerRef) =>
      task.taskRun((value) => resolveTask(fn(value)), rejectTask, cancelerRef)
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
   * @param task - a Task object
   * @param fn - the error mapper function
   */
  export function mapError<Value, ErrorFrom, ErrorTo>(
    task: Task<Value, ErrorFrom>,
    fn: (error: ErrorFrom) => ErrorTo
  ): Task<Value, ErrorTo> {
    return wrap<Value, ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task.taskRun(resolveTask, (error) => rejectTask(fn(error)), cancelerRef)
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
   * @param task - a Task object
   * @param fn - the value mapper function
   */
  export function andThen<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<ValueFrom, ErrorFrom>,
    fn: (value: ValueFrom) => Task<ValueTo, ErrorTo>
  ): Task<ValueTo, ErrorFrom | ErrorTo> {
    return wrap<ValueTo, ErrorFrom | ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task.taskRun((value) => fn(value).taskRun(resolveTask, rejectTask, cancelerRef), rejectTask, cancelerRef)
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
   * @param task - a Task object
   * @param fn - the value mapper function
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
   * @param task - a Task object
   * @param fn - the error mapper function
   */
  export function orElse<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
    task: Task<ValueFrom, ErrorFrom>,
    fn: (error: ErrorFrom) => Task<ValueTo, ErrorTo>
  ): Task<ValueFrom | ValueTo, ErrorTo> {
    return wrap<ValueFrom | ValueTo, ErrorTo>((resolveTask, rejectTask, cancelerRef) =>
      task.taskRun(resolveTask, (error) => fn(error).taskRun(resolveTask, rejectTask, cancelerRef), cancelerRef)
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
   * @param task - the task to be run
   */
  export function unsafeRun<Value, Error>(task: Task<Value, Error>): Awaitable<Result<Value, Error>> {
    const cancelerRef: Ref<() => void> = { current: Task.defaultCanceler };
    let returnValue: Result<Value, Error> | undefined;
    let resolveHandler = (result: Result<Value, Error>) => {
      returnValue = result;
    };
    let rejectHandler = (_error: unknown) => {};
    const runValue: void | Promise<void> = task.taskRun(
      (value) => resolveHandler(resultOk(value)),
      (error) => resolveHandler(resultError(error)),
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
   * const messageResult = Task.unsafeRunOk(getMessage);// 'Hello World!'
   * ```
   * @param task - the task to be run
   */
  export function unsafeRunOk<Value>(task: Task<Value, unknown>): Awaitable<Value> {
    const promiseOrValue = unsafeRun(task);
    // @ts-ignore - we assume PromiseLike.then returns a Promise
    // eslint-disable-next-line promise/prefer-await-to-then
    return isPromise(promiseOrValue) ? promiseOrValue.then(unsafeResultValue) : unsafeResultValue(promiseOrValue);
  }
}

// inline private constructors
function resultOk(): Result<void, never>;
function resultOk<V>(value: V): Result<V, never>;
function resultOk(value?: unknown): Result<unknown, never> {
  return { _: 'Ok', value };
}
function resultError(): Result<never, void>;
function resultError<E>(error: E): Result<never, E>;
function resultError(error?: unknown): Result<never, unknown> {
  return { _: 'Error', error };
}
function unsafeResultValue<V, E>(result: Result<V, E>) {
  if (result._ === 'Ok') {
    return result.value;
  }
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw result.error;
}

// utils
function isObject(anyValue: unknown): anyValue is Record<string, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
function isPromiseLike<V>(anyValue: unknown): anyValue is PromiseLike<V> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function';
}
function isPromise<V>(anyValue: unknown): anyValue is Promise<V> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
}
function resetCanceler(cancelerRef: Ref<Task.Canceler>) {
  cancelerRef.current = Task.defaultCanceler;
}
function triggerCanceler(cancelerRef: Ref<Task.Canceler>) {
  cancelerRef.current();
  resetCanceler(cancelerRef);
}
