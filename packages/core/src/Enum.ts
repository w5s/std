import { type Codec } from './Codec.js';
import { Type } from './Type.js';

const enumKeys: unique symbol = Symbol('Enum.enumKeys');
const enumValues: unique symbol = Symbol('Enum.enumValues');

/**
 * @namespace
 */
export const Enum = {
  /**
   * Define a new Enum Object
   *
   * @example
   * ```ts
   * const MyEnum = Enum.define({
   *   Foo: 'foo',
   *   Bar: 'bar',
   * });
   * ```
   * @param enumObject
   */
  define<const T extends Record<string, string | number | boolean>>(enumObject: T): Enum<T> {
    type Value = T[keyof T];

    const enumKeysList = Object.freeze(Object.keys(enumObject));
    const enumValuesList = Object.freeze(Object.values(enumObject)) as ReadonlyArray<Value>;
    const enumValuesSet = new Set<any>(enumValuesList);

    const EnumType = Type.define<Value>({
      typeName: 'Enum',
      hasInstance(anyValue) {
        return enumValuesSet.has(anyValue);
      },
      codecSchema: () => ({
        enum: enumValuesList,
      }),
    });

    return Object.freeze({
      [enumKeys]: enumKeysList,
      [enumValues]: enumValuesList,
      ...EnumType,
      ...enumObject,
    });
  },
  /**
   * Symbol for the property holding enum keys
   */
  enumKeys,
  /**
   * Symbol for the property holding enum values
   */
  enumValues,
  /**
   * Returns an array of enum keys
   *
   * @example
   * ```ts
   * const MyEnum = Enum.define({ Foo: 'foo', Bar: 'bar' });
   * Enum.keys(MyEnum) // ['Foo', 'Bar']
   * ```
   * @param enumObject
   */
  keys<T extends Enum>(enumObject: T): ReadonlyArray<Enum.KeyOf<T>> {
    return enumObject[enumKeys] as ReadonlyArray<Enum.KeyOf<T>>;
  },
  /**
   * Returns an array of enum values
   *
   * @example
   * ```ts
   * const MyEnum = Enum.define({ Foo: 'foo', Bar: 'bar' });
   * Enum.values(MyEnum) // ['foo', 'bar']
   * ```
   * @param enumObject
   */
  values<T extends Enum>(enumObject: T): ReadonlyArray<Enum.ValueOf<T>> {
    return enumObject[enumValues] as ReadonlyArray<Enum.ValueOf<T>>;
  },
};
export namespace Enum {
  type ArrayValue<T> = T extends ReadonlyArray<infer V> ? V : never;

  /**
   * Return enum keys of T
   */
  export type KeyOf<T extends Enum> = ArrayValue<T[typeof enumKeys]>;
  /**
   * Return enum values of T
   */
  export type ValueOf<T extends Enum> = ArrayValue<T[typeof enumValues]>;
}

export interface Enumerable<T extends Record<string, unknown> = Record<string, unknown>>
  extends Type<T[keyof T]>,
    Codec<T[keyof T]> {
  /**
   * An array of all keys
   */
  readonly [enumKeys]: ReadonlyArray<keyof T>;
  /**
   * An array of all values
   */
  readonly [enumValues]: ReadonlyArray<T[keyof T]>;
}

export type Enum<T extends Record<string, unknown> = Record<string, unknown>> = T & Enumerable<T>;
