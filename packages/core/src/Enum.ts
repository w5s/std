import type { Type } from './Type.js';
import { Symbol } from './Symbol.js';
import { keys } from './Enum/keys.js';
import { define } from './Enum/define.js';
import { values } from './Enum/values.js';
import type { Indexable } from './Indexable.js';

/**
 * @namespace
 */
export const Enum = {
  /**
   * Symbol for the property holding enum keys
   */
  enumKeys: Symbol.enumKeys,
  define,
  keys,
  values,
};
export namespace Enum {
  type ArrayValue<T> = T extends ReadonlyArray<infer V> ? V : never;

  /**
   * Return enum keys of T
   */
  export type KeyOf<T extends Enum<Record<string, any>>> = ArrayValue<T[typeof Symbol.enumKeys]>;
  /**
   * Return enum values of T
   */
  export type ValueOf<T extends Enum<Record<string, any>>> = T[KeyOf<T>];

  /**
   * Module containing methods for working with enum types
   */
  export interface Module<T extends Record<string, any> = Record<string, unknown>>
    extends Type.Module<T[keyof T]>, Indexable<T[keyof T], number>, EnumLike<T> {}
}

/**
 * Interface for objects that can be used as enums
 */
export interface EnumLike<T extends Record<string, any> = Record<string, unknown>> {
  /**
   * An array of all keys
   */
  readonly [Symbol.enumKeys]: ReadonlyArray<keyof T>;
}

export type Enum<T extends Record<string, any> = Record<string, unknown>> = T & Enum.Module<Omit<T, 'typeName'>>;
