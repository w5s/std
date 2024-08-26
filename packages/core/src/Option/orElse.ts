import type { Nullable } from '@w5s/core-type';
import type { Option } from '../Option.js';
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
 * @param option - an optional value
 * @param fn - a callback
 */
export function orElse<ValueFrom>(option: Nullable<ValueFrom>, fn: () => Nullable<ValueFrom>): Option<ValueFrom> {
  return option == null ? from(fn()) : option;
}
