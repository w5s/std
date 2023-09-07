import type { Option } from './option.js';
import type { Result } from './result.js';
import type { Ref } from './ref.js';
import type { Awaitable } from './type.js';
import { AggregateError } from './aggregateError.js';
import { cancel } from './cancel.js';

// Inline static helpers
const createTask = <Value, Error>(taskRun: Task<Value, Error>['taskRun']): Task<Value, Error> => ({
  taskRun,
});
const isObject = (anyValue: unknown): anyValue is Record<string, unknown> =>
  typeof anyValue === 'object' && anyValue !== null;
const isPromiseLike = <V>(anyValue: unknown): anyValue is PromiseLike<V> =>
  isObject(anyValue) && typeof anyValue['then'] === 'function';

const Ok: typeof Result.Ok = ((value?: unknown) => ({ _: 'Ok', ok: true, value })) as unknown as typeof Result.Ok;
const Err: typeof Result.Error = ((error?: unknown): Result<never, unknown> => ({
  _: 'Error',
  ok: false,
  error,
})) as unknown as typeof Result.Error;

/**
 * Interface used to cancel running task
 */
export interface TaskCanceler extends Ref<Option<() => void>> {}

/**
 * A function that runs the task and returns a {@link @w5s/core!Result}
 */
export type TaskRunner = <Value, Error>(
  task: Task<Value, Error>,
  canceler: TaskCanceler
) => Awaitable<Result<Value, Error>>;

/**
 * All context passed to task in order to execute
 */
export interface TaskParameters<Value, Error> {
  /**
   * Resolve callback
   */
  readonly resolve: (value: Value) => void;
  /**
   * Reject callback
   */
  readonly reject: (error: Error) => void;
  /**
   * Reference to cancel function
   */
  readonly canceler: TaskCanceler;
  /**
   * The runner function (to run sub tasks)
   */
  readonly run: TaskRunner;
}

/**
 * A Task represents a lazy computation, that will be evaluated later.
 * The result of the computation is a {@link @w5s/core!Result}
 * A task is also cancelable and can run other subtasks
 */
export interface Task<Value, Error> {
  /**
   * A callback with side effects
   */
  readonly taskRun: (parameters: TaskParameters<Value, Error>) => void;
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
    setCanceler: (cancelerFn: Option<() => void>) => void;
  }) => Awaitable<Result<Value, Error>>
): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return createTask(({ resolve, reject, canceler }) => {
    canceler.current = undefined;
    const resultOrPromise = sideEffect({
      ok: Ok,
      error: Err,
      setCanceler: (cancelerFn) => {
        canceler.current = cancelerFn;
      },
    });
    const handleResult = (result: Result<Value, Error>) => {
      if (result.ok) {
        resolve(result.value);
      } else {
        reject(result.error);
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

  const emptyArray = Object.freeze([]);

  type TaskEntry<Value, Error> = Readonly<{
    task: Task<Value, Error>;
    canceler: TaskCanceler;
  }>;

  class TaskAggregateState<Value, Error, ReturnValue, ReturnError> {
    readonly tasks: ReadonlyArray<TaskEntry<Value, Error>>;

    readonly taskCount: number;

    readonly taskParameters: TaskParameters<ReturnValue, ReturnError>;

    #taskCompleted = 0;

    #closed = false;

    constructor(tasks: Array<Task<Value, Error>>, taskParameters: TaskParameters<ReturnValue, ReturnError>) {
      this.tasks = tasks.map((task) => ({
        task,
        canceler: { current: undefined },
      }));
      this.taskCount = this.tasks.length;
      this.taskParameters = taskParameters;
    }

    isComplete() {
      return this.#taskCompleted === this.taskCount;
    }

    complete() {
      this.#taskCompleted = this.taskCount;
    }

    cancelAll() {
      this.tasks.forEach(({ canceler }) => cancel(canceler));
    }

    runAll(
      resolveTask: (value: Value, entry: TaskEntry<Value, Error>, index: number) => void,
      rejectTask: (error: Error, entry: TaskEntry<Value, Error>, index: number) => void
    ) {
      const { run } = this.taskParameters;
      this.tasks.forEach((entry, taskIndex) => {
        entry.task.taskRun({
          resolve: (value: Value) => {
            if (!this.isComplete()) {
              this.#taskCompleted += 1;
              resolveTask(value, entry, taskIndex);
            }
          },
          reject: (error: Error) => {
            if (!this.isComplete()) {
              this.#taskCompleted += 1;
              rejectTask(error, entry, taskIndex);
            }
          },
          canceler: entry.canceler,
          run,
        });
      });
    }

    resolve(value: ReturnValue) {
      if (!this.#closed) {
        this.#closed = true;
        this.taskParameters.resolve(value);
      }
    }

    reject(error: ReturnError) {
      if (!this.#closed) {
        this.#closed = true;
        this.taskParameters.reject(error);
      }
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
   * const successResult = unsafeRun(success);// Result.Ok([1, 2])
   *
   * const failure = Task.all([
   *   Task.resolve(1),
   *   Task.reject('error'),
   * ]);
   * const failureResult = unsafeRun(failure);// Result.Error('error')
   * ```
   * @param tasks - tasks to be run in parallel
   */
  export function all<T extends readonly Task<any, any>[]>(
    tasks: [...T]
  ): Task<{ [K in keyof T]: ValueType<T[K]> }, ErrorType<T[keyof T]>>;
  export function all<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<ReadonlyArray<Value>, Error>;
  export function all<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<ReadonlyArray<Value>, Error> {
    return createTask((parameters) => {
      const taskArray = Array.from(tasks);
      if (taskArray.length === 0) {
        parameters.resolve(emptyArray);
      } else {
        const state = new TaskAggregateState(taskArray, parameters);

        // Set global canceler
        parameters.canceler.current = state.cancelAll.bind(state);

        // eslint-disable-next-line unicorn/no-new-array
        const values = new Array<Value | undefined>(state.taskCount);
        state.runAll(
          (value, entry, index) => {
            values[index] = value;
            if (state.isComplete()) {
              state.resolve(values as ReadonlyArray<Value>);
            }
          },
          (error: Error, entry) => {
            if (!state.isComplete()) {
              state.complete();
              state.reject(error);
              // cancel all but the current task
              entry.canceler.current = undefined;
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
   * const successResult = unsafeRun(success);// Result.Ok(2)
   *
   * const failure = Task.any([
   *   Task.reject('error1'),
   *   Task.reject('error2'),
   * ]);
   * const failureResult = unsafeRun(failure);// Result.Error(AggregateError({ errors: ['error1', 'error2']}))
   * ```
   * @param tasks - tasks to be run in parallel
   */
  export function any<T extends Task<any, any>[]>(
    tasks: [...T]
  ): Task<ValueType<T[keyof T]>, AggregateError<{ [K in keyof T]: ErrorType<T[K]> }>>;
  export function any<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<Value, AggregateError<Error[]>>;
  export function any<Value, Error>(tasks: Iterable<Task<Value, Error>>): Task<Value, AggregateError<Error[]>> {
    return createTask((parameters) => {
      const taskArray = Array.from(tasks);

      if (taskArray.length === 0) {
        parameters.reject(AggregateError({ errors: [] }));
      } else {
        const state = new TaskAggregateState(taskArray, parameters);

        // Set global canceler
        parameters.canceler.current = state.cancelAll.bind(state);

        // eslint-disable-next-line unicorn/no-new-array
        const errors = new Array<Error | undefined>(state.taskCount);
        state.runAll(
          (value, entry) => {
            if (!state.isComplete()) {
              state.complete();
              state.resolve(value);
              // cancel all but the current task
              entry.canceler.current = undefined;
              state.cancelAll();
            }
          },
          (error, entry, index) => {
            errors[index] = error;
            if (state.isComplete()) {
              state.reject(AggregateError({ errors: errors as Error[] }));
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
   * const taskResults = unsafeRun(task);// [Result.Error(1), Result.Ok(2)]
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
    return createTask((parameters) => {
      const taskArray = Array.from(tasks);

      if (taskArray.length === 0) {
        parameters.resolve(emptyArray);
      } else {
        const state = new TaskAggregateState(taskArray, parameters);

        // eslint-disable-next-line unicorn/no-new-array
        const results = new Array<Result<Value, Error>>(state.taskCount);
        const finish = () => {
          if (state.isComplete()) {
            state.resolve(Object.freeze(results));
          }
        };
        state.runAll(
          (value, entry, index) => {
            results[index] = Ok(value);
            finish();
          },
          (error, entry, index) => {
            results[index] = Err(error);
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
   * const result = unsafeRun(task);// Result.Ok(1)
   * ```
   * @category Constructor
   * @param value - the success value
   */
  export function resolve<Error = never>(): Task<void, Error>;
  export function resolve<Value, Error = never>(value: Value): Task<Value, Error>;
  export function resolve<Error = never>(value?: unknown): Task<unknown, Error> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return createTask(({ resolve }) => resolve(value));
  }

  /**
   * Constructor that always returns a failed `Task` that rejects `error`.
   * This is a shorthand for `Task(({ error }) => error(errorValue))`
   *
   * @example
   * ```typescript
   * const task = Task.reject(1);
   * const result = unsafeRun(task);// Result.Error(1)
   * ```
   * @category Constructor
   * @param errorValue - the error value
   */
  export function reject<Value = never>(): Task<Value, void>;
  export function reject<Value = never, Error = never>(errorValue: Error): Task<Value, Error>;
  export function reject<Value = never>(errorValue?: unknown): Task<Value, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return createTask(({ reject }) => reject(errorValue));
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
    return createTask((parameters) =>
      task.taskRun({ ...parameters, resolve: (value) => parameters.resolve(fn(value)) })
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
    return createTask((parameters) => task.taskRun({ ...parameters, reject: (error) => parameters.reject(fn(error)) }));
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
    return createTask((parameters) =>
      task.taskRun({ ...parameters, resolve: (value) => fn(value).taskRun(parameters) })
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
    return createTask((parameters) =>
      task.taskRun({ ...parameters, reject: (error) => fn(error).taskRun(parameters) })
    );
  }
}
