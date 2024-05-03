import { invariant } from '@w5s/invariant';
import type { Type } from '../Type.js';

/**
 * Ensure that `value` is a valid `T`. Throw an error otherwise.
 *
 * @example
 * ```ts
 * const StringType: Type<string>;
 * Type.ensure(StringType, 'foo'); // void
 * Type.ensure(StringType, 42); // throw new Error('42 is not a valid String')
 * ```
 * @param Type - the type module
 * @param anyValue - the value to ensure
 */
export function ensure<T>(Type: Type<T>, anyValue: unknown): asserts anyValue is T {
  invariant(Type.hasInstance(anyValue), `${String(anyValue)} is not a valid ${Type.typeName}`);
}
