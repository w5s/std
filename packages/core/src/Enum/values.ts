import type { Enum } from '../Enum.js';
import { Symbol } from '../Symbol.js';

/**
 * Returns an array of enum values
 *
 * @example
 * ```ts
 * const MyEnum = Enum.define({ Foo: 'foo', Bar: 'bar' });
 * Enum.values(MyEnum) // ['foo', 'bar']
 * ```
 * @param enumObject
 */
export function values<T extends Enum>(enumObject: T): ReadonlyArray<Enum.ValueOf<T>> {
  return enumObject[Symbol.enumValues] as ReadonlyArray<Enum.ValueOf<T>>;
}
