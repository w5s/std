import type { Type } from '../Type.js';

import { decode } from '../Codec/decode.js';
import { encode } from '../Codec/encode.js';
import { schema } from '../Codec/schema.js';
import { Symbol } from '../Symbol.js';
import { define } from './define.js';

const { isArray } = globalThis.Array;

export function Tuple<C extends ReadonlyArray<Type.Module<any>>>(
  ...items: C
): Type.Module<{ readonly [K in keyof C]: Type.TypeOf<C[K]> }> {
  const typeName = `[${items.map((item) => item.typeName).join(',')}]`;
  return define({
    hasInstance: (anyValue): boolean =>
      isArray(anyValue) && items.every((item, itemIndex) => item.hasInstance(anyValue[itemIndex])),
    [Symbol.decode]: (input, { error, ok }) => {
      if (!Array.isArray(input)) {
        return error(input, typeName);
      }
      const returnValue = [];

      for (let index = 0; index < items.length; index += 1) {
        const decoded = decode(items[index]!, input[index]);
        if (!decoded.ok) {
          return error(input, typeName);
        }
        // @ts-ignore

        returnValue[index] = decoded.value;
      }
      return ok(
        // @ts-ignore
        returnValue,
      );
    },
    [Symbol.encode]: (input) => items.map((item, itemIndex) => encode(item, input[itemIndex])),
    [Symbol.schema]: () => ({
      items: items.map(schema),
      type: 'array',
    }),
    typeName,
  });
}
