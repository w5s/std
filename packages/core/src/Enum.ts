import type { Codec } from './Codec.js';
import type { Type } from './Type.js';
import { Symbol } from './Symbol.js';
import { keys } from './Enum/keys.js';
import { define } from './Enum/define.js';
import { values } from './Enum/values.js';

/**
 * @namespace
 */
export const Enum = {
  /**
   * Symbol for the property holding enum keys
   */
  enumKeys: Symbol.enumKeys,
  /**
   * Symbol for the property holding enum values
   */
  enumValues: Symbol.enumValues,
  define,
  keys,
  values,
};
export namespace Enum {
  type ArrayValue<T> = T extends ReadonlyArray<infer V> ? V : never;

  /**
   * Return enum keys of T
   */
  export type KeyOf<T extends Enum> = ArrayValue<T[typeof Symbol.enumKeys]>;
  /**
   * Return enum values of T
   */
  export type ValueOf<T extends Enum> = ArrayValue<T[typeof Symbol.enumValues]>;
}

export interface Enumerable<T extends Record<string, unknown> = Record<string, unknown>>
  extends Type<T[keyof T]>,
    Codec<T[keyof T]> {
  /**
   * An array of all keys
   */
  readonly [Symbol.enumKeys]: ReadonlyArray<keyof T>;
  /**
   * An array of all values
   */
  readonly [Symbol.enumValues]: ReadonlyArray<T[keyof T]>;
}

export type Enum<T extends Record<string, unknown> = Record<string, unknown>> = T & Enumerable<T>;
