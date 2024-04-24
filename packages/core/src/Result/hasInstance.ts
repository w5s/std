import type { Result } from '../Result.js';
import { Error } from './Error.js';
import { Ok } from './Ok.js';

/**
 * Return `true` if `anyValue` is {@link Result.Ok} or {@link Result.Error}
 *
 * @example
 * ```typescript
 * Result.hasInstance(null); // === false
 * Result.hasInstance(Result.Ok(null)); // === true
 * ```
 * @category Type
 * @param anyValue - the value to tested
 */
export function hasInstance(anyValue: unknown): anyValue is Result<unknown, unknown> {
  return (
    typeof anyValue === 'object' &&
    anyValue !== null && // @ts-ignore compare type property
    (anyValue._ === Ok.typeName || anyValue._ === Error.typeName)
  );
}
