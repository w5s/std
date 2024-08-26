import type { Nullable } from '@w5s/core-type';

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
  return option == null ? matchers.None() : matchers.Some(option);
}
