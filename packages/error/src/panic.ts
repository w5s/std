/**
 * Throw the given `error` to stop execution. Can be used as expression unlike throw statement.
 *
 * @example
 * ```typescript
 * const unknownValue: unknown = 123;
 * const stringValue = typeof unknownValue === 'string' ? unknownValue : panic(new Error('not a string'));
 * ```
 * @param error - the error to throw
 */
export function panic(error: unknown): never {
  throw error;
}
