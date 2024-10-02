import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

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
  },
): Return {
  return isOk(result) ? matchers.Ok(result.value) : matchers.Error(result.error);
}
