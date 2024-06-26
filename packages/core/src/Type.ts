import type { Codec } from './Codec.js';
import { define } from './Type/define.js';
import { String } from './Type/String.js';
import { Number } from './Type/Number.js';
import { Boolean } from './Type/Boolean.js';
import { BigInt } from './Type/BigInt.js';
import { $Object } from './Type/Object.js';
import { Option as $Option } from './Type/Option.js';
import { Int } from './Type/Int.js';
import { Array } from './Type/Array.js';
import { ensure } from './Type/ensure.js';
import type { Option } from './Option.js';
import { anyOf } from './Type/anyOf.js';

export type InspectFunction = (anyValue: unknown, options: InspectOptions) => string;

export type InspectOptions = Record<string, unknown>;

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
   * Try to convert anyValue to enum value or else returns `Option.None`
   *
   * @example
   * ```ts
   * const StringType: Type<string>;
   * StringType.from('foo'); // Option.Some('foo')
   * StringType.from(12); // Option.None
   * ```
   * @category Constructor
   * @param anyValue
   */
  from(anyValue: unknown): Option<T>;
  /**
   * When defined, returns a custom string representation
   *
   * @example
   * ```ts
   * ```
   *
   * @category Type
   * @param anyValue
   */
  inspect?: (anyValue: T, depth: number, options: InspectOptions, inspect: InspectFunction) => string;
}

/**
 * @namespace
 */
export const Type = {
  anyOf,
  define,
  ensure,
  Array,
  BigInt,
  Boolean,
  Int,
  Number,
  Object: $Object,
  Option: $Option,
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
    from?: Type<T>['from'];
    inspect?: Type<T>['inspect'];
  }

  /**
   * Type module interface
   */
  export interface Module<T> extends Type<T>, Codec<T> {}
}
