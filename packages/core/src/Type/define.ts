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
    codecDecode = (value, { ok, error }) => (hasInstance(value) ? ok(value) : error(`Invalid ${typeName}`)),
    codecSchema = () => ({}),
  } = parameters;
  return {
    typeName,
    hasInstance,
    codecEncode,
    codecDecode,
    codecSchema,
  };
}
