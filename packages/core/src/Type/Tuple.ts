/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Type } from '../Type.js';
import { define } from './define.js';
import { encode as codecEncode } from '../Codec/encode.js';
import { decode as codecDecode } from '../Codec/decode.js';
import { schema as codecSchema } from '../Codec/schema.js';

const { isArray } = globalThis.Array;

export function Tuple<C extends ReadonlyArray<Type.Module<any>>>(
  ...items: C
): Type.Module<{ readonly [K in keyof C]: Type.TypeOf<C[K]> }> {
  const typeName = `[${items.map((item) => item.typeName).join(',')}]`;
  return define({
    typeName,
    hasInstance: (anyValue): boolean =>
      isArray(anyValue) && items.every((item, itemIndex) => item.hasInstance(anyValue[itemIndex])),
    codecEncode: (input) => items.map((item, itemIndex) => codecEncode(item, input[itemIndex])),
    codecDecode: (input, { ok, error }) => {
      if (!Array.isArray(input)) {
        return error(input, typeName);
      }
      const returnValue = [];

      // eslint-disable-next-line unicorn/no-for-loop
      for (let index = 0; index < items.length; index += 1) {
        const decoded = codecDecode(items[index]!, input[index]);
        if (!decoded.ok) {
          return error(input, typeName);
        }
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnValue[index] = decoded.value;
      }
      return ok(
        // @ts-ignore
        returnValue
      );
    },
    codecSchema: () => ({
      type: 'array',
      items: items.map(codecSchema),
    }),
  });
}
