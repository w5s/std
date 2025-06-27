import type { Option, OptionLike } from '../Option.js';
import { from } from './from.js';

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
 * @param self - an optional value
 * @param fn - a callback
 */
export function orElse<ValueFrom>(self: OptionLike<ValueFrom>, fn: () => OptionLike<ValueFrom>): Option<ValueFrom> {
  return self == null ? from(fn()) : self;
}
