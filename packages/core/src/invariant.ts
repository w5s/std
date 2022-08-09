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
    warning.print(`Warning: ${message ?? ''}`);
  }
}
export namespace warning {
  export function print(message: Option<string>): void {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}
