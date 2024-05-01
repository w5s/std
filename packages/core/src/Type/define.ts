import { invariant } from '@w5s/invariant';
import type { Type } from '../Type.js';

/**
 * Define a new Type module
 *
 * @example
 * ```ts
 * interface NewType {
 *   foo: boolean;
 * }
 * const NewType = Type.define<NewType>({
 *   typeName: 'NewType',
 *   hasInstance(value) {
 *     return typeof value.foo === 'boolean';
 *   },
 * });
 * ```
 * @param parameters - the type parameters
 */
export function define<T>(parameters: Type.Parameters<T>): Type.Module<T> {
  const hasInstance = parameters.hasInstance as Type<T>['hasInstance'];
  const {
    typeName,
    codecEncode = (value) => value,
    codecDecode = (value, { ok, error }) =>
      hasInstance(value) ? ok(value) : error(`Cannot decode ${String(value)} as ${typeName}`),
    codecSchema = () => ({}),
  } = parameters;
  const ensure = (anyValue: unknown) =>
    invariant(hasInstance(anyValue), `${String(anyValue)} is not a valid ${typeName}`);
  return {
    typeName,
    hasInstance,
    ensure,
    codecEncode,
    codecDecode,
    codecSchema,
  };
}
