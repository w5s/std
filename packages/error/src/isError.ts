/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const hasStructuredClone = structuredClone !== undefined;

/**
 * Check if the provided value is an Error object.
 *
 * @example
 * ```ts
 * isError(new Error('Test Error')); // true
 * isError(new TypeError('Test Error')); // true
 *
 * isError(undefined); // false
 * isError({ name: 'Error' }); // false
 * ```
 *
 * @param anyValue - The value to check.
 * @returns true if the value is an Error object, false otherwise.
 */
export function isError(anyValue: unknown): anyValue is Error {
  return anyValue instanceof Error ? true : hasStructuredClone ? structuredClone(anyValue) instanceof Error : false;
}
