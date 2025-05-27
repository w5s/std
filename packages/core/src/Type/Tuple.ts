/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Type } from '../Type.js';
import { define } from './define.js';
import { encode } from '../Codec/encode.js';
import { decode } from '../Codec/decode.js';
import { schema } from '../Codec/schema.js';
import { Symbol } from '../Symbol.js';

const { isArray } = globalThis.Array;

export function Tuple<C extends ReadonlyArray<Type.Module<any>>>(
  ...items: C
): Type.Module<{ readonly [K in keyof C]: Type.TypeOf<C[K]> }> {
  const typeName = `[${items.map((item) => item.typeName).join(',')}]`;
  return define({
    typeName,
    hasInstance: (anyValue): boolean =>
      isArray(anyValue) && items.every((item, itemIndex) => item.hasInstance(anyValue[itemIndex])),
    [Symbol.encode]: (input) => items.map((item, itemIndex) => encode(item, input[itemIndex])),
    [Symbol.decode]: (input, { ok, error }) => {
      if (!Array.isArray(input)) {
        return error(input, typeName);
      }
      const returnValue = [];

      // eslint-disable-next-line unicorn/no-for-loop
      for (let index = 0; index < items.length; index += 1) {
        const decoded = decode(items[index]!, input[index]);
        if (!decoded.ok) {
          return error(input, typeName);
        }
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnValue[index] = decoded.value;
      }
      return ok(
        // @ts-ignore
        returnValue,
      );
    },
    [Symbol.schema]: () => ({
      type: 'array',
      items: items.map(schema),
    }),
  });
}
