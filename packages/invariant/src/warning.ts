/**
 * Assert that `condition` is truthy, else print a message using `console.warn`
 *
 * In production environment, `message` parameter could be stripped from source in order to reduce file size
 *
 * @example
 * ```typescript
 * warning(true, 'this should be true');// pass
 * warning(false, 'this should be true');// console.warn('Warning: this should be true')
 * ```
 * @param condition - the predicate result
 * @param message - an optional message for Error
 */
export function warning(condition: boolean, message?: string | null): void {
  if (!condition) {
    // eslint-disable-next-line no-console
    console.warn(`Warning: ${message ?? ''}`);
  }
}
