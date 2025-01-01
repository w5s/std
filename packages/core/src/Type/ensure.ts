import type { Type } from '../Type.js';

/**
 * Ensure that `value` is a valid `T`. Throw a TypeError otherwise.
 *
 * @example
 * ```typescript
 * Type.ensure(Type.String, 'foo'); // void
 * Type.ensure(Type.String, 42); // throw new Error('42 is not a valid String')
 * ```
 * @param Type - the type module
 * @param anyValue - the value to ensure
 */
export function ensure<T>(Type: Type<T>, anyValue: unknown): asserts anyValue is T {
  if (!Type.hasInstance(anyValue)) {
    throw new TypeError(`${String(anyValue)} is not a valid ${Type.typeName}`);
  }
}
