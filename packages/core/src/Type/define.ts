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
    inspect,
    codecEncode = (value) => value,
    codecDecode = (value, { ok, error }) => (hasInstance(value) ? ok(value) : error(value, typeName)),
    codecSchema = () => ({}),
    from = (value) => (hasInstance(value) ? value : undefined),
  } = parameters;
  return {
    typeName,
    hasInstance,
    inspect,
    codecEncode,
    codecDecode,
    codecSchema,
    from,
  };
}
