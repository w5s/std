import type { Enum } from '../Enum.js';
import { Indexable } from '../Indexable.js';
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
  const enumValuesIndex = new Map<unknown, number>(enumValuesList.map((value, index) => [value, index]));

  const EnumType = defineType<Value>({
    typeName: 'Enum',
    hasInstance(anyValue) {
      return enumValuesIndex.has(anyValue);
    },
    codecSchema: () => ({
      enum: enumValuesList,
    }),
  });
  const EnumIndexable = Indexable<Value>({
    indexType: 'number',
    at: (index) => enumValuesList[index],
    indexOf: (value) => enumValuesIndex.get(value),
  });

  return Object.freeze({
    [Symbol.enumKeys]: enumKeysList,
    [Symbol.enumValues]: enumValuesList,
    ...EnumType,
    ...EnumIndexable,
    ...enumObject,
  });
}
