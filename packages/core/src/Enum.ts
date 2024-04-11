import type { Type } from './Type.js';

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
   * const MyEnum = Enum.Make({
   *   Foo: 'foo',
   *   Bar: 'bar',
   * });
   * ```
   * @param enumObject
   */
  Make<const T extends Record<string, unknown>>(enumObject: T): Enum<T> {
    const enumKeysList = Object.freeze(Object.keys(enumObject));
    const enumValuesList = Object.freeze(Object.values(enumObject)) as ReadonlyArray<T[keyof T]>;
    const enumValuesSet = new Set(enumValuesList);

    function hasInstance(anyValue: unknown): anyValue is T[keyof T] {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return enumValuesSet.has(anyValue as any);
    }

    return Object.freeze({
      [enumKeys]: enumKeysList,
      [enumValues]: enumValuesList,
      typeName: 'Enum',
      hasInstance,
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
   * const MyEnum = Enum.Make({ Foo: 'foo', Bar: 'bar' });
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
   * const MyEnum = Enum.Make({ Foo: 'foo', Bar: 'bar' });
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

export interface Enumerable<T extends Record<string, unknown> = Record<string, unknown>> extends Type<T[keyof T]> {
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
