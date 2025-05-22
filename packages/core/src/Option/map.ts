import type { Nullable } from '@w5s/core-type';
import type { Option } from '../Option.js';
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
 * @param self - an optional value
 * @param fn - the mapper function
 */
export function map<ValueFrom, ValueTo>(
  self: Nullable<ValueFrom>,
  fn: (value: ValueFrom) => NonNullable<ValueTo>,
): Option<ValueTo> {
  return isNone(self) ? undefined : fn(self);
}
