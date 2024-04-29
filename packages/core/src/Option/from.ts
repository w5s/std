import type { Option } from '../Option.js';
import type { Nullable } from '../typing.js';

type NullableValues = Exclude<Nullable, Option.None>;

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
  return value == null ? undefined : (value as Exclude<Value, NullableValues>);
}
