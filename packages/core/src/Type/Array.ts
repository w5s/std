import type { Array as CoreArray } from '@w5s/core-type';

import type { Type } from '../Type.js';

import { decode } from '../Codec/decode.js';
import { schema } from '../Codec/schema.js';
import { isOk } from '../Result/isOk.js';
import { Symbol } from '../Symbol.js';
import { define } from './define.js';

const { isArray } = globalThis.Array;

/**
 * Type for immutable array
 */
export type Array<Item> = CoreArray<Item>;

/**
 * Returns a codec for `Array<V>`.
 *
 * @example
 * ```typescript
 * const codec = Type.Array(dateISO);
 * const encoded = Codec.encode(codec, [new Date('1970-01-01T00:00:00.000Z')]);// ['1970-01-01T00:00:00.000Z']
 * const decoded = Codec.decode(codec, ['1970-01-01T00:00:00.000Z']);// Result.Ok([Date('1970-01-01T00:00:00.000Z')])
 * ```
 * @param Item the type module for array item
 */
export function Array<V>(Item: Type.Module<V>): Type.Module<Array<V>> {
  return define({
    hasInstance: (anyValue): anyValue is Array<V> =>
      isArray(anyValue) && anyValue.every(Item.hasInstance),
    [Symbol.decode]: (input, { error, ok }) => {
      if (!isArray(input)) {
        return error(input, 'Array');
      }

      const values = [];

      // eslint-disable-next-line ts/prefer-for-of
      for (let index = 0; index < input.length; index += 1) {
        const result = decode(Item, input[index]);
        if (!isOk(result)) {
          return result;
        }
        values.push(result.value);
      }
      return ok(values);
    },
    [Symbol.encode]: (input) => input.map(Item[Symbol.encode]),
    [Symbol.schema]: () => ({ item: schema(Item), type: 'array' }),
    typeName: `Array<${Item.typeName}>`,
  });
}
