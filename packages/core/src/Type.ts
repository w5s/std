import type { PartialKeys } from '@w5s/core-type';

import type { AsString } from './AsString.js';
import type { Codec } from './Codec.js';
import type { Option } from './Option.js';
import type { Symbol } from './Symbol.js';

import { Array } from './Type/Array.js';
import { bigint } from './Type/bigint.js';
import { boolean } from './Type/boolean.js';
import { Char } from './Type/Char.js';
import { constant } from './Type/constant.js';
import { define } from './Type/define.js';
import { ensure } from './Type/ensure.js';
import { Int } from './Type/Int.js';
import { number } from './Type/number.js';
import { TObject } from './Type/Object.js';
import { Option as TOption } from './Type/Option.js';
import { Ordering } from './Type/Ordering.js';
import { Record } from './Type/Record.js';
import { RegExp } from './Type/RegExp.js';
import { string } from './Type/string.js';
import { Tuple } from './Type/Tuple.js';
import { union } from './Type/union.js';
import { unknown } from './Type/unknown.js';
import { URL } from './Type/URL.js';
import { UUID } from './Type/UUID.js';

export type InspectFunction = (anyValue: unknown, options: InspectOptions) => string;

export type InspectOptions = globalThis.Record<string, unknown>;

/**
 * A type that represents a class module of `T` instances
 */
export interface Type<T> {
  /**
   * When defined, returns a custom string representation.
   * To be useful, it should be bound to a prototype (ex: {@link Struct})
   *
   * @example
   * ```typescript
   * import { inspect } from 'node:util';
   *
   * interface Foo {
   *   foo: boolean;
   * }
   * const Foo = Struct.define<Foo>({
   *   typeName: 'Foo',
   *   __inspect__: (self) => `Foo { ${String(self.foo)} }`,
   * });
   * const myStruct = Struct.create(Foo, { foo: true });// 'Foo { true }'
   * inspect(myStruct);// 'Foo { true }'
   * ```
   * @category Type
   * @param anyValue
   */
  [Symbol.inspect]: Option<(anyValue: T, depth: number, options: InspectOptions, inspect: InspectFunction) => string>;

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
  asInstance(this: void, anyValue: unknown): Option<T>;

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
  hasInstance(this: void, anyValue: unknown): anyValue is T;

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
}

/**
 * @namespace
 */
export const Type = {
  Array,
  bigint,
  boolean,
  Char,
  constant,
  define,
  ensure,
  Int,
  number,
  Object: TObject,
  Option: TOption,
  Ordering,
  Record,
  RegExp,
  string,
  Tuple,
  union,
  unknown,
  URL,
  UUID,
};

export namespace Type {
  /**
   * Type module interface
   */
  export interface Module<T> extends AsString<T>, Codec<T>, Type<T> {}

  /**
   * Type module constructor parameters
   */
  export interface Parameters<T>
    extends
    Partial<Codec<T>>,
    Partial<AsString<T>>,
    PartialKeys<Omit<Type<T>, 'hasInstance'>, 'asInstance' | Symbol.inspect> {
    hasInstance: (value: unknown) => boolean;
  }

  /**
   * Extract the type of object from its module
   */
  export type TypeOf<V> = V extends Type<infer T> ? T : never;
}
