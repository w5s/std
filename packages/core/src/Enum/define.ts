import type { Enum } from '../Enum.js';
import { Symbol } from '../Symbol.js';
import { define as defineType } from '../Type/define.js';

/**
 * Define a new Enum Object
 *
 * @example
 * ```ts
 * const MyEnum = Enum.define({
 *   Foo: 'foo',
 *   Bar: 'bar',
 * });
 * ```
 * @param enumObject
 */
export function define<const T extends Record<string, string | number | boolean>>(enumObject: T): Enum<T> {
  type Value = T[keyof T];

  const enumKeysList = Object.freeze(Object.keys(enumObject));
  const enumValuesList = Object.freeze(Object.values(enumObject)) as ReadonlyArray<Value>;
  const enumValuesSet = new Set<any>(enumValuesList);

  const EnumType = defineType<Value>({
    typeName: 'Enum',
    hasInstance(anyValue) {
      return enumValuesSet.has(anyValue);
    },
    codecSchema: () => ({
      enum: enumValuesList,
    }),
  });

  return Object.freeze({
    [Symbol.enumKeys]: enumKeysList,
    [Symbol.enumValues]: enumValuesList,
    ...EnumType,
    ...enumObject,
  });
}
