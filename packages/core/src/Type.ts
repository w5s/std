import type { Codec } from './Codec.js';
import { define } from './Type/define.js';
import { String } from './Type/String.js';
import { Number } from './Type/Number.js';
import { Boolean } from './Type/Boolean.js';
import { BigInt } from './Type/BigInt.js';
import { Struct } from './Type/Struct.js';
import { Option } from './Type/Option.js';
import { Int } from './Type/Int.js';
import { Array } from './Type/Array.js';

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
  /**
   * Ensure that `value` is a valid `T`. Throw an error otherwise.
   *
   * @example
   * ```ts
   * const StringType: Type<string>;
   * StringType.ensure('foo'); // void
   * StringType.ensure(42); // throw new Error('42 is not a valid String')
   * ```
   * @category Type
   * @param anyValue
   */
  ensure(anyValue: unknown): asserts anyValue is T;
}

/**
 * @namespace
 */
export const Type = {
  define,
  Array,
  BigInt,
  Boolean,
  Int,
  Number,
  Struct,
  Option,
  String,
};
export namespace Type {
  /**
   * Extract the type of object from its module
   */
  export type TypeOf<V> = V extends Type<infer T> ? T : never;

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
