import type { Option, OptionLike } from '../Option.js';
import { from } from './from.js';

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
 * @param self - an optional value
 * @param fn - a callback
 */
export function andThen<ValueFrom, ValueTo>(
  self: OptionLike<ValueFrom>,
  fn: (value: ValueFrom) => OptionLike<ValueTo>,
): Option<ValueTo> {
  return self == null ? undefined : from(fn(self));
}
