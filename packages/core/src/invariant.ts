import type { Option } from './option.js';

/**
 * Assert that `condition` is truthy, else throws `Error { name: 'InvariantError', message }`
 *
 * In production environment, `message` parameter could be stripped from source in order to reduce file size
 *
 * @example
 * ```typescript
 * invariant(true, 'this should be true');// pass
 * invariant(false, 'this should be true');// throw new Error('this should be true')
 * ```
 * @param condition - the predicate result
 * @param message - an optional message for Error
 */
export function invariant(condition: false, message?: Option<string>): never;
export function invariant(condition: boolean, message?: Option<string>): asserts condition;
export function invariant(condition: boolean, message?: Option<string>): asserts condition {
  if (!condition) {
    const error = new Error(message == null ? '' : message);
    error.name = 'InvariantError';
    // @ts-ignore framesToPop is not defined
    error.framesToPop = 1; // Ignore call to invariant() in stacktrace
    throw error;
  }
}

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
export function warning(condition: boolean, message?: Option<string>): void {
  if (!condition) {
    warning.current(`Warning: ${message ?? ''}`);
  }
}

/**
 * Current warning implementation
 *
 * @internal
 * @example
 */
warning.current = (message: Option<string>): void => {
  // eslint-disable-next-line no-console
  console.warn(message);
};

/**
 * Raise a compile error when accessing this function and throws a TypeError at runtime
 * This is useful for exhaustive switch check.
 *
 * @example
 * ```typescript
 * const print = (fruit: 'banana'|'kiwi') => {
 *   switch (fruit) {
 *     case 'banana': return '🍌 Banana';
 *     case 'kiwi': return '🥝 Kiwi';
 *     default: return assertNever(fruit); // <- This line will report an error if a case is missing
 *   }
 * }
 * ```
 * @param subject - the never value that should be reported
 */
export function assertNever<V extends never>(subject: V): V {
  return subject;
}
