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
 * @param parameters - the type parameters
 */
export function define<T>(parameters: Type.Parameters<T>): Type.Module<T> {
  const hasInstance = parameters.hasInstance as Type<T>['hasInstance'];
  const {
    typeName,
    __inspect__,
    __encode__ = (value) => value,
    __decode__ = (value, { ok, error }) => (hasInstance(value) ? ok(value) : error(value, typeName)),
    __schema__ = () => ({}),
    asInstance = (value) => (hasInstance(value) ? value : undefined),
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    asString = (self) => (typeof self === 'object' ? `[object ${typeName}]` : `${self}`),
  } = parameters;
  return {
    typeName,
    hasInstance,
    __inspect__,
    __encode__,
    __decode__,
    __schema__,
    asInstance,
    asString,
  };
}
