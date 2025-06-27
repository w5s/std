import type { Nullable } from '@w5s/core-type';
import { None } from './Option/None.js';
import { Some } from './Option/Some.js';
import { andThen } from './Option/andThen.js';
import { from } from './Option/from.js';
import { getOrElse } from './Option/getOrElse.js';
import { getOrThrow } from './Option/getOrThrow.js';
import { isNone } from './Option/isNone.js';
import { isSome } from './Option/isSome.js';
import { map } from './Option/map.js';
import { orElse } from './Option/orElse.js';

// https://doc.rust-lang.org/std/option/enum.Option.html

/**
 * `Option<Value>` is the type used to represent either a defined value `Some<Value>` or `None` (i.e. `null` or `undefined`)
 *
 * This module focuses on handling `null` and `undefined` values in a functional style, to avoid throwing errors at runtime.
 * Because `Option.None = undefined`, this modules provides an opinionated way to remove confusion between `null` and `undefined`.
 *
 * Some other libraries uses object to implement Maybe/Option monad but has drawbacks :
 * - ECMAScript already uses nullable/undefined values everywhere
 * - Each library that does not uses the `Some/None` must be patched / overridden
 * - it creates a third empty value `None` in addition to `null` and `undefined`
 *
 * @example
 * ```typescript
 * const getName = (num) => num % 2 === 0? Option.Some('Django') : Option.None;
 * const displayName = (option) => Option.map(option, (value) => 'name: '+ value);
 * const print = (option) => {
 *   if (Option.isNone(option)) {
 *     console.warn('None');
 *   } else {
 *     console.log('Some(', option, ')');
 *   }
 * }
 *
 * for (let i = 0; i < 6; i++) {
 *   const option = displayName(getName(i));
 *   print(option); // alternate console.log('Some(Django)'); and console.warn('None');
 * }
 * ```
 * @param Value - the type of the contained value
 */
export type Option<Value> = Value | Option.None;

/**
 * `OptionLike<Value>` is the type used to represent either a Nullable value
 */
export type OptionLike<Value> = Nullable<Value>;

/**
 * @namespace
 */
export const Option = {
  Some,
  None,
  andThen,
  from,
  getOrElse,
  getOrThrow,
  isNone,
  isSome,
  map,
  orElse,
};

export namespace Option {
  /**
   * Alias for `undefined`
   */
  export type None = undefined;

  /**
   * Non `null` and non `undefined` value
   */
  export type Some<Value> = Value extends Nullable ? never : Value;
}
