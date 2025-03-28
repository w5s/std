import { InvariantError } from './InvariantError.js';

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
export function invariant(condition: false, message?: string | null): never;
export function invariant(condition: boolean, message?: string | null): asserts condition;
export function invariant(condition: boolean, message?: string | null): asserts condition {
  if (!condition) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new InvariantError({ message: message == null ? '' : message });
  }
}
