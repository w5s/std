import type { Result } from '../Result.js';

/**
 * Create a new `Error` object
 *
 * @example
 * ```typescript
 * Error();// { _: 'Error', ok: false, value: undefined }
 * Error(new globalThis.Error('my message'));// { _: 'Error', ok: false, error: Error}
 * ```
 * @category Constructor
 * @param resultError - the failure value
 */
export function Error(): Result<never, void>;
/**
 *
 * @example
 * ```typescript
 * ```
 *@param resultError - the failure value
 */
export function Error<E>(resultError: E): Result<never, E>;
export function Error(resultError?: unknown): Result<never, unknown> {
  return {
    _: Error.typeName,
    ok: false,
    error: resultError,
  };
}
Error.typeName = 'Error' as const;
