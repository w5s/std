import type { Array as ArrayType } from '../Array.js';
import { Codec } from '../Codec.js';
import { isOk } from '../Result/isOk.js';
import type { Type } from '../Type.js';
import { define } from './define.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { isArray } = globalThis.Array;

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
export function Array<V>(Item: Type.Module<V>): Type.Module<ArrayType<V>> {
  return define({
    typeName: `Array<${Item.typeName}>`,
    hasInstance: (anyValue): anyValue is ArrayType<V> =>
      // eslint-disable-next-line @typescript-eslint/unbound-method
      isArray(anyValue) && anyValue.every(Item.hasInstance),
    codecEncode: (input) => input.map(Item.codecEncode),
    codecDecode: (input, { ok, error }) => {
      if (!isArray(input)) {
        return error(input, 'Array');
      }

      const values = [];
      // eslint-disable-next-line unicorn/no-for-loop
      for (let index = 0; index < input.length; index += 1) {
        const result = Codec.decode(Item, input[index]);
        if (!isOk(result)) {
          return result;
        }
        values.push(result.value);
      }
      return ok(values);
    },
    codecSchema: () => ({ type: 'array', item: Codec.schema(Item) }),
  });
}
