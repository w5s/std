import type { Type } from '../Type.js';

/**
 * Define a new Type module
 *
 * @example
 * ```typescript
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
 * @param parameters the type parameters
 */
export function define<T>(parameters: Type.Parameters<T>): Type.Module<T> {
  const hasInstance = parameters.hasInstance as Type<T>['hasInstance'];
  const { typeName } = parameters;
  const {
    __decode__ = (value, { error, ok }) => (hasInstance(value) ? ok(value) : error(value, typeName)),
    __encode__ = (value) => value,
    __inspect__,
    __schema__ = () => ({}),
    asInstance = (value) => (hasInstance(value) ? value : undefined),
    asString = (self) => (typeof self === 'object' ? `[object ${typeName}]` : String(self)),
  } = parameters;
  return {
    __decode__,
    __encode__,
    __inspect__,
    __schema__,
    asInstance,
    asString,
    hasInstance,
    typeName,
  };
}
