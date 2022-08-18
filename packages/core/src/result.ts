import type { DataObject } from './dataObject.js';
import type { Option } from './option.js';

// https://doc.rust-lang.org/std/result/enum.Result.html

/**
 * `Result<Value, Error>` is the type used to represent either a `Result.Ok<Value>` or a `Result.Error<Error>` as a function return value.
 * `Result.Ok<Value>` should be used when the result is the expected value.
 * `Result.Error<Error>` should be used when recoverable error occurred (i.e. an error that does not require the program to stop)
 *
 * Results can be used with async functions returning `Promise<Result<Value, Error>>`.
 *
 * **Important: Rejected `Promise` and thrown `Error` should only occur when the program has an unexpected state that should stop the execution**
 *
 * @example
 * ```typescript
 * const getName = (num) => num % 2 === 0? Result.Ok('Django') : Result.Error('error!');
 * const displayName = (result) => Result.map(result, (value) => 'name: '+ value);
 * const print = (result) => {
 *   if (Result.isError(result)) {
 *     console.error(result.error);
 *   } else {
 *     console.log(result.value);
 *   }
 * }
 *
 * for (let i = 0; i < 6; i++) {
 *   const result = displayName(getName(i));
 *   print(result); // alternate console.log('name: Django'); and console.error('error!');
 * }
 * ```
 * @param Value - the type of value in case of `Ok`
 * @param Error - the type of error in case of `Error`
 */
export type Result<Value, Error> = Result.Ok<Value> | Result.Error<Error>;

export namespace Result {
  type NonPromise<V> = Exclude<V, Promise<unknown>>;

  export interface Ok<V>
    extends DataObject<{
      [DataObject.type]: 'Ok';
      /**
       * The success value
       */
      value: V;
    }> {}

  /**
   * Create a new `Ok` object
   *
   * @example
   * ```typescript
   * Result.Ok('value');// { _: 'Ok', value: 'value'}
   * ```
   * @category Constructor
   * @param resultValue - the success value
   */
  export function Ok<V>(resultValue: V): Result<V, never> {
    return {
      _: Ok.typeName,
      value: resultValue,
    };
  }
  Ok.typeName = 'Ok' as const;

  export interface Error<E>
    extends DataObject<{
      [DataObject.type]: 'Error';
      /**
       * The error value
       */
      error: E;
    }> {}

  /**
   * Create a new `Error` object
   *
   * @example
   * ```typescript
   * Result.Error(new Error('my message'));// { _: 'Error', error: Error}
   * ```
   * @category Constructor
   * @param resultError - the failure value
   */
  export function Error<E>(resultError: E): Result<never, E> {
    return {
      _: Error.typeName,
      error: resultError,
    };
  }
  Error.typeName = 'Error' as const;

  /**
   * Return `true` if `anyValue` is {@link Result.Ok} or {@link Result.Error}
   *
   * @example
   * ```typescript
   * Result.hasInstance(null); // === false
   * Result.hasInstance(Result.Ok(null)); // === true
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function hasInstance(anyValue: unknown): anyValue is Result<unknown, unknown> {
    return (
      typeof anyValue === 'object' &&
      anyValue !== null &&
      (isOk(
        // @ts-ignore compare type property
        anyValue
      ) ||
        isError(
          // @ts-ignore compare type property
          anyValue
        ))
    );
  }

  /**
   * Return `true` if `anyValue` is {@link Result.Ok}
   *
   * @example
   * ```typescript
   * let x = Ok('foo');
   * console.log(Result.isOk(x));// true
   *
   * let x = Error('foo');
   * console.log(Result.isOk(x));// false
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function isOk<V, E>(anyValue: Result<V, E>): anyValue is Ok<V> {
    return anyValue._ === Ok.typeName;
  }

  /**
   * Return `true` if `anyValue` is {@link Result.Error}
   *
   * @example
   * ```typescript
   * let x = Ok('foo');
   * console.log(Result.isError(x));// false
   *
   * let x = Error('foo');
   * console.log(Result.isError(x));// true
   * ```
   * @category Guard
   * @param anyValue - the value to tested
   */
  export function isError<V, E>(anyValue: Result<V, E>): anyValue is Error<E> {
    return anyValue._ === Error.typeName;
  }

  /**
   * Maps a `Result<ValueFrom, Error>` to `Result<ValueTo, Error>` by applying a function to a contained {@link Result.Ok} value, leaving a {@link Result.Error} value untouched.
   * This function can be used to compose the results of two functions.
   *
   * @example
   * ```typescript
   * const result = Ok('foo');
   * Result.map(result, (value) => `${value}_bar`));// Ok('foo_bar')
   * ```
   * @param result - a Result object
   * @param fn - the mapper function
   */
  export function map<VFrom, VTo, E>(result: Result<VFrom, E>, fn: (value: VFrom) => VTo): Result<VTo, E> {
    return isOk(result) ? Ok(fn(result.value)) : result;
  }

  /**
   * Maps a `Result<Value, ErrorFrom>` to `Result<Value, ErrorTo>` by applying a function to a contained {@link Result.Error} value, leaving a {@link Result.Ok} value untouched.
   * This function can be used to pass through a successful result while handling an error.
   *
   * @example
   * ```typescript
   * const result = Error('foo');
   * Result.mapError(result, (value) => `${value}_bar`));// Error('foo_bar')
   * ```
   * @param result - a Result object
   * @param fn - the error  mapper function
   */
  export function mapError<V, EFrom, ETo>(result: Result<V, EFrom>, fn: (error: EFrom) => ETo): Result<V, ETo> {
    return isOk(result) ? result : Error(fn(result.error));
  }

  /**
   * Returns the `value` if {@link Result.Ok}, {@link Option.None} if {@link Result.Error}
   *
   * @example
   * ```typescript
   * let x = Ok('foo');
   * Result.value(x);// Option.Some('foo')
   *
   * let x = Error('foo');
   * Result.value(x);// Option.None
   * ```
   * @category Accessor
   * @param result - a Result object
   */
  export function value<V>(result: Ok<V> | Result<V, never>): Option.Some<V>;
  export function value(result: Error<unknown> | Result<never, unknown>): Option.None;
  export function value<V>(result: Result<V, unknown>): Option<V>;
  export function value<V>(result: Result<V, unknown>): Option<V> {
    return isError(result) ? undefined : result.value;
  }

  /**
   * Returns the `error` if {@link Result.Error}, {@link Option.None} if {@link Result.Ok}
   *
   * @example
   * ```typescript
   * let x = Ok('foo');
   * Result.error(x);// Option.None
   *
   * let x = Error('foo');
   * Result.error(x);// Option.Some('foo')
   * ```
   * @category Accessor
   * @param result - a Result object
   */
  export function error<E>(result: Error<E> | Result<never, E>): Option.Some<E>;
  export function error(result: Ok<unknown> | Result<unknown, never>): Option.None;
  export function error<E>(result: Result<unknown, E>): Option<E>;
  export function error<E>(result: Result<unknown, E>): Option<E> {
    return isError(result) ? result.error : undefined;
  }

  /**
   * Returns the `value` if {@link Result.Ok}, `getDefaultValue()` if {@link Result.Error}.
   *
   * @example
   * ```typescript
   * let x = Ok('foo');
   * Result.getOrElse(x, () => 'bar');// 'foo'
   *
   * let x = Error('foo');
   * Result.getOrElse(x, () => 'bar');// 'bar'
   * ```
   * @category Accessor
   * @param result - a Result object
   * @param getDefaultValue - a function that returns default value
   */
  export function getOrElse<V, VDefault>(result: Result<V, unknown>, getDefaultValue: () => VDefault): V | VDefault {
    return isOk(result) ? result.value : getDefaultValue();
  }

  /**
   * Returns the `value` if {@link Result.Ok}, throw `error` if {@link Result.Error}.
   *
   * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
   * @example
   * ```typescript
   * let x = Ok('foo');
   * Result.getOrThrow(x);// 'foo'
   *
   * let x = Error('foo');
   * Result.getOrThrow(x);// throw 'error'
   * ```
   * @category Accessor
   * @param result - a Result object
   */
  export function getOrThrow<V>(result: Result<V, unknown>): V {
    if (isOk(result)) {
      return result.value;
    }
    throw result.error;
  }

  /**
   * Calls `fn` if the result is {@link Result.Ok}, otherwise returns the {@link Result.Error} value of self.
   * This function can be used for control flow based on `Result` values.
   *
   * @example
   * ```typescript
   * const square = (num: number): Result<number, 'TestError'> => Result.Ok(num * num);
   * Result.andThen(Result.Ok(4), square); // Result.Ok(16)
   * Result.andThen(Result.Error('TestError'), square); // Result.Error('TestError')
   * ```
   * @param result - a Result object
   * @param fn - a value mapping function
   */
  export function andThen<VFrom, EFrom, VTo, ETo>(
    result: Result<VFrom, EFrom>,
    fn: (value: VFrom) => Result<VTo, ETo>
  ): Result<VTo, EFrom | ETo> {
    return isOk(result) ? fn(result.value) : result;
  }

  /**
   * Calls `fn` if the result is {@link Result.Error}, otherwise returns the {@link Result.Ok} value of self.
   * This function can be used for control flow based on result values.
   *
   * @example
   * ```typescript
   * const handleError = (message: string) => Result.Ok(message + '_handled');
   * Result.orElse(Result.Error('TestError'), square); // Result.Ok('TestError_handled')
   * Result.orElse(Result.Ok(4), square); // Result.Ok(4)
   * ```
   * @param result - a Result object
   * @param fn - a error mapping function
   */
  export function orElse<VFrom, EFrom, VTo, ETo>(
    result: Result<VFrom, EFrom>,
    fn: (error: EFrom) => Result<VTo, ETo>
  ): Result<VFrom | VTo, ETo> {
    return isOk(result) ? result : fn(result.error);
  }

  /**
   * Returns `Ok(block())`. If an error was thrown then it returns `Error(onError(<<thrown error>>))` instead
   *
   * @example
   * ```typescript
   * const class InvalidURLError extends Error {}
   * const result = Result.tryCall(
   *  () => new URL('my/url'),
   *  (error) => new InvalidURLError()
   * );
   *
   * const class FetchError extends Error {}
   * const result = Result.tryCall(
   *  () => fetch('my/url'),
   *  () => new FetchError()
   * );
   * ```
   * @param block - A function that will be called
   * @param onError - An error handler that transforms `unknown` to a normalized and typed error
   */
  export function tryCall<V, E>(
    block: () => Promise<V>,
    onError: (error: unknown) => Promise<E>
  ): Promise<Result<V, E>>;
  export function tryCall<V, E>(block: () => NonPromise<V>, onError: (error: unknown) => NonPromise<E>): Result<V, E>;
  export function tryCall<V, E>(block: () => V | Promise<V>, onError: (error: unknown) => E | Promise<E>) {
    try {
      const returnValue = block();
      if (isPromise(returnValue)) {
        // eslint-disable-next-line promise/prefer-await-to-then
        return returnValue.then(Ok, async (rejectError) => Error(await onError(rejectError)));
      }

      return Ok(returnValue);
    } catch (thrownError: unknown) {
      const resultError = onError(thrownError);

      // eslint-disable-next-line promise/prefer-await-to-then
      return isPromise(resultError) ? resultError.then(Error) : Error(resultError);
    }
  }

  /**
   * Return `matchers.Ok(value)` if `result` is `Ok`, otherwise `matchers.Error(error)`
   *
   * @example
   * ```typescript
   * const stringify = (opt: Result<{foo: string}, { bar: string}>) => Option.match(opt, {
   *  Ok: ({ foo }) => foo + '_ok',
   *  Error: ({ bar }) => bar + '_error',
   * });
   *
   * const okString = stringify(Result.Ok({ foo: 'foo_value' })); // 'foo_value_ok'
   * const errorString = stringify(Result.Error({ bar: 'bar_value' })); // 'bar_value_error'
   * ```
   * @param result - a Result object
   * @param matchers - a matchers object with None and Some case
   * @param matchers.Ok - a callback to be called if the result is Ok
   * @param matchers.Error - a callback to be called if the result is Error
   */
  export function match<Value, Error, Return>(
    result: Result<Value, Error>,
    matchers: {
      Ok: (value: Value) => Return;
      Error: (error: Error) => Return;
    }
  ): Return {
    return isOk(result) ? matchers.Ok(result.value) : matchers.Error(result.error);
  }
}

function isObject(anyValue: unknown): anyValue is Record<string, unknown> {
  return typeof anyValue === 'object' && anyValue !== null;
}
function isPromise(anyValue: unknown): anyValue is Promise<unknown> {
  return isObject(anyValue) && typeof anyValue['then'] === 'function' && typeof anyValue['catch'] === 'function';
}
