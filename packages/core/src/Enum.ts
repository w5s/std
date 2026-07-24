import type { Indexable } from './Indexable.js';
import type { Type } from './Type.js';

import { define } from './Enum/define.js';
import { keys } from './Enum/keys.js';
import { values } from './Enum/values.js';
import { Symbol } from './Symbol.js';

/**
 * @namespace
 */
export const Enum = {
  define,

  /**
   * Symbol for the property holding enum keys
   */
  enumKeys: Symbol.enumKeys,
  keys,
  values,
};
export namespace Enum {
  /**
   * Return enum keys of T
   */
  export type KeyOf<T extends Enum<Record<string, any>>> = ArrayValue<T[typeof Symbol.enumKeys]>;

  /**
   * Module containing methods for working with enum types
   */
  export interface Module<T extends Record<string, any> = Record<string, unknown>>
    extends EnumLike<T>, Indexable<T[keyof T], number>, Type.Module<T[keyof T]> {}

  /**
   * Return enum values of T
   */
  export type ValueOf<T extends Enum<Record<string, any>>> = T[KeyOf<T>];

  type ArrayValue<T> = T extends ReadonlyArray<infer V> ? V : never;
}

export type Enum<T extends Record<string, any> = Record<string, unknown>> = Enum.Module<Omit<T, 'typeName'>> & T;

/**
 * Interface for objects that can be used as enums
 */
export interface EnumLike<T extends Record<string, any> = Record<string, unknown>> {
  /**
   * An array of all keys
   */
  readonly [Symbol.enumKeys]: ReadonlyArray<keyof T>;
}
