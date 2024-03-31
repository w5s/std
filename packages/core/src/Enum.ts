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
    return Object.freeze({
      [enumKeys]: Object.freeze(Object.keys(enumObject)),
      [enumValues]: Object.freeze(Object.values(enumObject)) as ReadonlyArray<T[keyof T]>,
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

export type Enum<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  /**
   * An array of all keys
   */
  readonly [enumKeys]: ReadonlyArray<keyof T>;
  /**
   * An array of all values
   */
  readonly [enumValues]: ReadonlyArray<T[keyof T]>;
};
