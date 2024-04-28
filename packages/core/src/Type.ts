import type { Codec } from './Codec.js';
import { define } from './Type/define.js';
import { String } from './String.js';
import { Number } from './Number.js';
import { Boolean } from './Boolean.js';

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
  define,
  Boolean,
  Number,
  String,
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
