import type { Enum } from '../Enum.js';
import { keys } from './keys.js';

/**
 * Returns an array of enum values
 *
 * @example
 * ```typescript
 * const MyEnum = Enum.define({ Foo: 'foo', Bar: 'bar' });
 * Enum.values(MyEnum) // ['foo', 'bar']
 * ```
 * @param enumObject
 */
export function values<T extends Enum<Record<string, any>>>(enumObject: T): ReadonlyArray<Enum.ValueOf<T>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return keys(enumObject).map((key) => enumObject[key]) as ReadonlyArray<Enum.ValueOf<T>>;
}
