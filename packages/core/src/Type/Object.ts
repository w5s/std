/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { encode as codecEncode } from '../Codec/encode.js';
import { decode as codecDecode } from '../Codec/decode.js';
import { schema as codecSchema } from '../Codec/schema.js';
import type { JSONValue } from '../JSON.js';
import { isOk } from '../Result/isOk.js';
import type { Type } from '../Type.js';
import { define } from './define.js';

/**
 * Returns a new Type for `P`.
 *
 * @example
 * ```typescript
 * const SomeType = Type.Object({ created: dateISO }, 'SomeType');
 * const encoded = Codec.encode(SomeType, { created: new Date('1970-01-01T00:00:00.000Z') });// { created: '1970-01-01T00:00:00.000Z' }
 * const decoded = Codec.decode(SomeType, { created: '1970-01-01T00:00:00.000Z' });// Result.Ok({ created: Date('1970-01-01T00:00:00.000Z') })
 * ```
 * @param Properties - the codec for each array item
 */
export function $Object<P>(
  Properties: {
    readonly [K in keyof P]: Type.Module<P[K]>;
  },
  typeName?: string
): Type.Module<Readonly<P>>;
export function $Object(
  Properties: Record<string, Type.Module<unknown>>,
  typeName?: string
): Type.Module<Record<string, unknown>> {
  const propertyNames = globalThis.Object.keys(Properties);
  const propertyNameCount = propertyNames.length;
  return define({
    typeName: typeName ?? 'Object',
    hasInstance: (anyValue): anyValue is Record<string, unknown> => {
      if (typeof anyValue === 'object' && anyValue !== null) {
        for (let index = 0; index < propertyNameCount; index += 1) {
          const propertyName = propertyNames[index]!;
          if (!Properties[propertyName]!.hasInstance((anyValue as Record<string, unknown>)[propertyName])) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    codecEncode: (input) => {
      const returnValue: Record<string, unknown> = {};

      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;

        returnValue[propertyName] = codecEncode(Properties[propertyName]!, input[propertyName]);
      }

      return returnValue;
    },
    codecDecode: (input, { ok, error }) => {
      if (input == null || typeof input !== 'object') {
        return error(input, 'object');
      }

      const returnValue: Record<string, unknown> = {};
      for (let index = 0; index < propertyNameCount; index += 1) {
        const propertyName = propertyNames[index]!;
        const decodeResult = codecDecode(Properties[propertyName]!, (input as Record<string, unknown>)[propertyName]);
        if (!isOk(decodeResult)) {
          return decodeResult;
        }
        returnValue[propertyName] = decodeResult.value;
      }
      return ok(returnValue);
    },
    codecSchema: () =>
      propertyNames.reduce(
        (acc, propertyName) => {
          acc.properties[propertyName] = codecSchema(Properties[propertyName]!);

          return acc;
        },
        {
          type: 'object',
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          properties: {} as Record<string, unknown>,
          required: [] as string[],
        }
      ) as JSONValue,
  });
}
