import type { Option } from '../Option.js';
import type { Nullable } from '../typing.js';
import { isNone } from './isNone.js';

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
  return isNone(option) ? undefined : fn(option);
}
