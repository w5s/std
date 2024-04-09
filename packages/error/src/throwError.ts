/**
 * Throw the given `error`. Often used as expression
 *
 * @example
 * ```typescript
 * const unknownValue: unknown = 123;
 * const stringValue = typeof unknownValue === 'string' ? unknownValue : throwError(new Error('not a string'));
 * ```
 * @param error - the error to throw
 */
export function throwError(error: unknown): never {
  throw error;
}
