import type { Enum } from '../Enum.js';
import { Symbol } from '../Symbol.js';

/**
 * Returns an array of enum keys
 *
 * @example
 * ```typescript
 * const MyEnum = Enum.define({ Foo: 'foo', Bar: 'bar' });
 * Enum.keys(MyEnum) // ['Foo', 'Bar']
 * ```
 * @param enumObject
 */
export function keys<T extends Enum<Record<string, any>>>(enumObject: T): ReadonlyArray<Enum.KeyOf<T>> {
  return enumObject[Symbol.enumKeys] as ReadonlyArray<Enum.KeyOf<T>>;
}
