import type { Codec } from './Codec.js';

/**
 * A type that represents a class module of `T` instances
 */
export interface Type<T> {
  /**
   * Type string representation
   *
   * @example
   * ```ts
   * StringType.typeName // 'String'
   * Int.typeName // 'Int'
   * Person.typeName // 'Person'
   * ```
   * @category Type
   */
  typeName: string;
  /**
   * Return `true` if the given value is an instance of the class.
   *
   * @example
   * ```ts
   * const StringType: Type<string>;
   * StringType.hasInstance('foo'); // true
   * StringType.hasInstance(42); // false
   * ```
   *
   * @category Type
   * @param anyValue
   */
  hasInstance(anyValue: unknown): anyValue is T;
}

/**
 * @namespace
 */
export const Type = {
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
  define<T>(parameters: Type.Parameters<T>): Type.Module<T> {
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
  },
};
export namespace Type {
  /**
   * Type module constructor parameters
   */
  export interface Parameters<T> extends Partial<Codec<T>> {
    typeName: string;
    hasInstance: (value: unknown) => boolean;
  }

  /**
   * Type module interface
   */
  export interface Module<T> extends Type<T>, Codec<T> {}
}
