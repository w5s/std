import type { Nullable } from './type.js';

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

export namespace Option {
  type NullableValues = Exclude<Nullable, None>;

  /**
   * Alias for `undefined`
   */
  export type None = undefined;

  /**
   * Alias for `undefined`. It is an opinionated choice that discourages the use of `null`
   */
  export const None = undefined;

  /**
   * Non `null` and non `undefined` value
   */
  export type Some<Value> = Value extends Nullable ? never : Value;

  /**
   * An identity function that validates passed value
   *
   * @example
   * ```typescript
   * ```
   * @category Constructor
   * @param value - the non empty value
   */
  export function Some<Value>(value: Some<Value>): Value {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value == null) {
      throw new TypeError('Value must be non null, non undefined value');
    }

    return value;
  }

  /**
   * Try to coerce value to `Option`
   *
   * @example
   * ```typescript
   * Option.from(null);// undefined
   * Option.from(undefined);// undefined
   * Option.from('foo');// 'foo'
   * ```
   * @category Constructor
   * @param value - the converted value
   */
  export function from<Value>(value: Value): Option<Exclude<Value, NullableValues>> {
    return value == null ? None : (value as Exclude<Value, NullableValues>);
  }

  /**
   * Return `true` if `anyValue` is `null`or `undefined`
   *
   * @example
   * ```typescript
   * Option.isNone(None);// true
   * Option.isNone(undefined);// true
   * Option.isNone(null);// true
   *
   * Option.isNone(Some('foo'));// false
   * Option.isNone('foo');// false
   * ```
   * @category Type
   * @param anyValue - the value to test
   */
  export function isNone(anyValue: unknown): anyValue is Nullable {
    return anyValue == null;
  }

  /**
   * Return `true` if `anyValue` is neither `null` nor `undefined`
   *
   * @example
   * ```typescript
   * Option.isSome(Option.None);// false
   * Option.isSome(undefined);// false
   * Option.isSome(null);// false
   *
   * Option.isSome(Option.Some('foo'));// true
   * Option.isSome('foo');// true
   * ```
   * @category Type
   * @param anyValue - the value to test
   */
  export function isSome<Value>(anyValue: Value): anyValue is Exclude<Value, Nullable> {
    return !isNone(anyValue);
  }

  /**
   * Maps a `Option<Value>` to `Option<U>` by applying a function to a contained `Some` value, leaving a `None` value untouched.
   * This function can be used to compose the results of two functions.
   *
   * @example
   * ```typescript
   * const x = Some('foo');
   * Option.map(x, (value) => `${value}_bar`));// Some('foo_bar') == 'foo_bar'
   * ```
   * @param option - an optional value
   * @param fn - the mapper function
   */
  export function map<ValueFrom, ValueTo>(
    option: Nullable<ValueFrom>,
    fn: (value: ValueFrom) => NonNullable<ValueTo>
  ): Option<ValueTo> {
    return isNone(option) ? None : fn(option);
  }

  /**
   * Returns the `value` if `Some`, `getDefaultValue()` if `None`.
   *
   * @example
   * ```typescript
   * const x = Some('foo');
   * Option.getOrElse(x, () => 'bar');// 'foo'
   *
   * const x = None;
   * Option.getOrElse(x, () => 'bar');// 'bar'
   * ```
   * @category Accessor
   * @param option - an optional value
   * @param getDefaultValue - a default value
   */
  export function getOrElse<Value, DefaultValue>(
    option: Nullable<Value>,
    getDefaultValue: () => DefaultValue
  ): Value | DefaultValue {
    return option == null ? getDefaultValue() : option;
  }

  /**
   * Returns the value if `Some`, throw an error if `None`
   *
   * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
   * @example
   * ```typescript
   * let x = Some('foo');
   * Option.getOrThrow(x);// 'foo'
   *
   * let x = None;
   * Option.getOrThrow(x);// throw TypeError('option must not be a null|undefined')
   * ```
   * @category Accessor
   * @param option - an optional value
   */
  export function getOrThrow<Value>(option: Nullable<Value>): Value {
    if (isSome(option)) {
      return option;
    }
    throw new TypeError('option must not be a null|undefined');
  }

  /**
   * Returns `Option.None` if the option is `Option.None`, otherwise calls `fn` with the value and returns the result.
   * Some languages call this operation `flatMap` or `chain`.
   *
   * @example
   * ```typescript
   * const square = (x: number): Option<number> => Option.Some(x * x);
   *
   * Option.andThen(Option.Some(2), square); // Option.Some(16)
   * Option.andThen(Option.None, square); // Option.None
   * ```
   * @param option - an optional value
   * @param fn - a callback
   */
  export function andThen<ValueFrom, ValueTo>(
    option: Nullable<ValueFrom>,
    fn: (value: ValueFrom) => Nullable<ValueTo>
  ): Option<ValueTo> {
    return option == null ? None : from(fn(option));
  }

  /**
   * Returns the option if it contains a value, otherwise calls `fn` and returns the result.
   *
   * @example
   * ```typescript
   * const alt = () => Some('bar')
   *
   * Option.orElse(Option.Some('foo'), alt); // Option.Some('foo')
   * Option.orElse(Option.None, alt); // Option.Some('bar')
   * ```
   * @param option - an optional value
   * @param fn - a callback
   */
  export function orElse<ValueFrom>(option: Nullable<ValueFrom>, fn: () => Nullable<ValueFrom>): Option<ValueFrom> {
    return option == null ? from(fn()) : option;
  }

  /**
   * Return `matchers.Some(value)` if `option` is `Some`, otherwise `matchers.None()`
   *
   * @example
   * ```typescript
   * const stringify = (opt: Option<{foo: string}>) => Option.match(opt, {
   *  Some: ({ foo }) => foo + '_baz',
   *  None: () => 'none'
   * });
   *
   * const someString = stringify(Option.Some({ foo: 'bar' })); // 'bar_baz'
   * const noneString = stringify(Option.None); // 'none'
   * ```
   * @param option - an optional value
   * @param matchers - a matchers object with None and Some case
   * @param matchers.None - a callback to be called if the option is None
   * @param matchers.Some - a callback to be called if the option is Some
   */
  export function match<Value, Return>(
    option: Nullable<Value>,
    matchers: {
      Some: (value: Value) => Return;
      None: () => Return;
    }
  ): Return {
    return isNone(option) ? matchers.None() : matchers.Some(option);
  }
}
