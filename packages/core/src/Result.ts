import { Ok } from './Result/Ok.js';
import { Error } from './Result/Error.js';
import { isOk } from './Result/isOk.js';
import { isError } from './Result/isError.js';
import { map } from './Result/map.js';
import { get } from './Result/get.js';
import { getError } from './Result/getError.js';
import { getOrElse } from './Result/getOrElse.js';
import { mapError } from './Result/mapError.js';
import { getOrThrow } from './Result/getOrThrow.js';
import { andThen } from './Result/andThen.js';
import { orElse } from './Result/orElse.js';
import { hasInstance } from './Result/hasInstance.js';
import { tryCall } from './Result/tryCall.js';

// https://doc.rust-lang.org/std/result/enum.Result.html

/**
 * `Result<Value, Error>` is the type used to represent either a `Result.Result.Ok<Value>` or a `Result.Error<Error>` as a function return value.
 * `Result.Result.Ok<Value>` should be used when the result is the expected value.
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

/**
 * @namespace
 */
export const Result = {
  Ok,
  Error,
  andThen,
  get,
  getError,
  getOrElse,
  getOrThrow,
  hasInstance,
  isError,
  isOk,
  map,
  mapError,
  orElse,
  tryCall,
};

export namespace Result {
  export interface Ok<V> {
    /**
     * `true` only for Ok objects
     */
    readonly ok: true;
    /**
     * The success value
     */
    readonly value: V;
  }

  export interface Error<E> {
    /**
     * `false` only for Error objects
     */
    readonly ok: false;
    /**
     * The error value
     */
    readonly error: E;
  }
}
