import type { Codec } from './Codec.js';
import { define } from './Type/define.js';
import { string } from './Type/string.js';
import { number } from './Type/number.js';
import { boolean } from './Type/boolean.js';
import { bigint } from './Type/bigint.js';
import { TObject } from './Type/Object.js';
import { Option as TOption } from './Type/Option.js';
import { Int } from './Type/Int.js';
import { Array } from './Type/Array.js';
import { ensure } from './Type/ensure.js';
import type { Option } from './Option.js';
import { union } from './Type/union.js';
import { constant } from './Type/constant.js';
import { Tuple } from './Type/Tuple.js';
import { unknown } from './Type/unknown.js';
import { UUID } from './Type/UUID.js';
import { Record } from './Type/Record.js';
import { URL } from './Type/URL.js';
import { Char } from './Type/Char.js';
import { RegExp } from './Type/RegExp.js';
import { Ordering } from './Type/Ordering.js';

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
   * ```typescript
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
   * ```typescript
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
   * ```typescript
   * const StringType: Type<string>;
   * StringType.asInstance('foo'); // Option.Some('foo')
   * StringType.asInstance(12); // Option.None
   * ```
   * @category Type
   * @param anyValue
   */
  asInstance(anyValue: unknown): Option<T>;
  /**
   * When defined, returns a custom string representation
   *
   * @example
   * ```typescript
   * ```
   *
   * @category Type
   * @param anyValue
   */
  inspect: Option<(anyValue: T, depth: number, options: InspectOptions, inspect: InspectFunction) => string>;
}

/**
 * @namespace
 */
export const Type = {
  union,
  constant,
  define,
  ensure,
  Array,
  Char,
  bigint,
  boolean,
  Int,
  number,
  Object: TObject,
  Option: TOption,
  Ordering,
  Record,
  string,
  Tuple,
  unknown,
  RegExp,
  UUID,
  URL,
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
    asInstance?: Type<T>['asInstance'];
    inspect?: Type<T>['inspect'];
  }

  /**
   * Type module interface
   */
  export interface Module<T> extends Type<T>, Codec<T> {}
}
