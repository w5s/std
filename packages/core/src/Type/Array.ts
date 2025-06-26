import { decode } from '../Codec/decode.js';
import { schema } from '../Codec/schema.js';
import { isOk } from '../Result/isOk.js';
import { Symbol } from '../Symbol.js';
import type { Type } from '../Type.js';
import { define } from './define.js';

const { isArray } = globalThis.Array;

/**
 * Type for immutable array
 */
export type Array<Item> = ReadonlyArray<Item>;

/**
 * Returns a codec for `Array<V>`.
 *
 * @example
 * ```typescript
 * const codec = Type.Array(dateISO);
 * const encoded = Codec.encode(codec, [new Date('1970-01-01T00:00:00.000Z')]);// ['1970-01-01T00:00:00.000Z']
 * const decoded = Codec.decode(codec, ['1970-01-01T00:00:00.000Z']);// Result.Ok([Date('1970-01-01T00:00:00.000Z')])
 * ```
 * @param Item - the type module for array item
 */
export function Array<V>(Item: Type.Module<V>): Type.Module<Array<V>> {
  return define({
    typeName: `Array<${Item.typeName}>`,
    hasInstance: (anyValue): anyValue is Array<V> =>
      // eslint-disable-next-line @typescript-eslint/unbound-method
      isArray(anyValue) && anyValue.every(Item.hasInstance),
    [Symbol.encode]: (input) => input.map(Item[Symbol.encode]),
    [Symbol.decode]: (input, { ok, error }) => {
      if (!isArray(input)) {
        return error(input, 'Array');
      }

      const values = [];
      // eslint-disable-next-line unicorn/no-for-loop
      for (let index = 0; index < input.length; index += 1) {
        const result = decode(Item, input[index]);
        if (!isOk(result)) {
          return result;
        }
        values.push(result.value);
      }
      return ok(values);
    },
    [Symbol.schema]: () => ({ type: 'array', item: schema(Item) }),
  });
}
