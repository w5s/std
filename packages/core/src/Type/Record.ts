/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Type } from '../Type.js';
import { define } from './define.js';
import { encode as codecEncode } from '../Codec/encode.js';
import { decode as codecDecode } from '../Codec/decode.js';

export type RecordKey = string | symbol;

/**
 * A Record is an immutable mapping `{ [string]: value }`
 */
export type Record<Key extends RecordKey, Value> = {
  readonly [P in Key]: Value;
};

export function Record<Key extends Type.Module<any>, Value extends Type.Module<any>>(
  Key: Key,
  Value: Value
): Type.Module<Record<Type.TypeOf<Key>, Type.TypeOf<Value>>> {
  const typeName = `Record<${Key.typeName},${Value.typeName}>`;
  return define({
    typeName,
    hasInstance: (anyValue): boolean =>
      typeof anyValue === 'object' && anyValue !== null
        ? Object.entries(anyValue).every(([key, value]) => Value.hasInstance(value) && Key.hasInstance(key))
        : false,
    codecEncode: (input) => {
      const returnValue: globalThis.Record<string, any> = {};
      for (const [key, value] of Object.entries(input)) {
        returnValue[String(codecEncode(Key, key))] = codecEncode(Value, value);
      }

      return returnValue;
    },
    codecDecode: (input, { ok, error }) => {
      if (typeof input !== 'object' || input === null) {
        return error(input, typeName);
      }
      const returnValue: globalThis.Record<any, Type.TypeOf<Value>> = {};
      for (const [key, value] of Object.entries(input)) {
        const keyDecoded = codecDecode(Key, key);
        const valueDecoded = codecDecode(Value, value);
        if (!keyDecoded.ok || !valueDecoded.ok) {
          return error(input, typeName);
        }

        returnValue[keyDecoded.value] = valueDecoded.value;
      }

      return ok(returnValue as Record<Type.TypeOf<Key>, Type.TypeOf<Value>>);
    },
    codecSchema: () => ({
      type: 'object',
    }),
  });
}
