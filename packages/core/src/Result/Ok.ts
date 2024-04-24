import type { Result } from '../Result.js';

/**
 * Create a new `Ok` object
 *
 * @example
 * ```typescript
 * Ok();// { _: 'Ok', ok: true, value: undefined }
 * Ok('value');// { _: 'Ok', ok: true, value: 'value'}
 * ```
 * @category Constructor
 * @param resultValue - the success value
 */
export function Ok(): Result<void, never>;
export function Ok<V>(resultValue: V): Result<V, never>;
export function Ok(resultValue?: unknown): Result<unknown, never> {
  return {
    _: Ok.typeName,
    ok: true,
    value: resultValue,
  };
}
Ok.typeName = 'Ok' as const;
