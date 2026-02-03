import type { Enum } from '../Enum.js';
import { Indexable } from '../Indexable.js';
import { Symbol } from '../Symbol.js';
import { define as defineType } from '../Type/define.js';

/**
 * Define a new Enum Object
 *
 * @example
 * ```typescript
 * const MyEnum = Enum.define({
 *   // typeName: 'MyEnum', // Add this we want a named Enum
 *   Foo: 'foo',
 *   Bar: 'bar',
 * });
 * ```
 * @param enumObject
 */
export function define<const T extends Record<string, string | number | boolean>>(
  enumObject: T & { typeName?: string },
): Enum<T> {
  type Value = T[keyof T];
  const { typeName, ...enumObjectRest } = enumObject;
  const enumKeysList = Object.freeze(Object.keys(enumObjectRest));
  const enumValuesList = Object.freeze(Object.values(enumObjectRest)) as ReadonlyArray<Value>;
  const enumValuesIndex = new Map<unknown, number>(enumValuesList.map((value, index) => [value, index]));

  const EnumType = defineType<Value>({
    typeName: typeName ?? enumValuesList.join('|'),
    hasInstance(anyValue) {
      return enumValuesIndex.has(anyValue);
    },
    [Symbol.schema]: () => ({
      enum: enumValuesList,
    }),
  });
  const EnumIndexable = Indexable<Value>({
    indexType: 'number',
    at: (index) => enumValuesList[index],
    indexOf: (value) => enumValuesIndex.get(value),
  });

  // @ts-ignore ignore errors and rely on tests
  return Object.freeze({
    [Symbol.enumKeys]: enumKeysList,
    ...EnumType,
    ...EnumIndexable,
    ...enumObjectRest,
  });
}
