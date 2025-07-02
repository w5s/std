/**
 * Check if the provided value is a DOMException object.
 *
 * @example
 * ```ts
 * isDOMException(new DOMException('Test Error')); // true
 *
 * isDOMException(new TypeError('Test Error')); // false
 * isDOMException(undefined); // false
 * isDOMException({ name: 'Error' }); // false
 * ```
 *
 * @param anyValue - The value to check.
 * @returns true if the value is an Error object, false otherwise.
 */
export function isDOMException(anyValue: unknown): anyValue is DOMException {
  return Object.prototype.toString.call(anyValue) === '[object DOMException]';
}
