/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Type } from '../Type.js';
import { define } from './define.js';
import { encode } from '../Codec/encode.js';
import { decode } from '../Codec/decode.js';
import { Symbol } from '../Symbol.js';

export type RecordKey = string | symbol;

/**
 * A Record is an immutable mapping `{ [string]: value }`
 */
export type Record<Key extends RecordKey, Value> = {
  readonly [P in Key]: Value;
};

export function Record<Key extends Type.Module<any>, Value extends Type.Module<any>>(
  Key: Key,
  Value: Value,
): Type.Module<Record<Type.TypeOf<Key>, Type.TypeOf<Value>>> {
  const typeName = `Record<${Key.typeName},${Value.typeName}>`;
  return define({
    typeName,
    hasInstance: (anyValue): boolean =>
      typeof anyValue === 'object' && anyValue !== null
        ? Object.entries(anyValue).every(([key, value]) => Value.hasInstance(value) && Key.hasInstance(key))
        : false,
    [Symbol.encode]: (input) => {
      const returnValue: globalThis.Record<string, any> = {};
      for (const [key, value] of Object.entries(input)) {
        returnValue[String(encode(Key, key))] = encode(Value, value);
      }

      return returnValue;
    },
    [Symbol.decode]: (input, { ok, error }) => {
      if (typeof input !== 'object' || input === null) {
        return error(input, typeName);
      }
      const returnValue: globalThis.Record<any, Type.TypeOf<Value>> = {};
      for (const [key, value] of Object.entries(input)) {
        const keyDecoded = decode(Key, key);
        const valueDecoded = decode(Value, value);
        if (!keyDecoded.ok || !valueDecoded.ok) {
          return error(input, typeName);
        }

        returnValue[keyDecoded.value] = valueDecoded.value;
      }

      return ok(returnValue as Record<Type.TypeOf<Key>, Type.TypeOf<Value>>);
    },
    [Symbol.schema]: () => ({
      type: 'object',
    }),
  });
}
